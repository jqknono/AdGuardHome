package filtering

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/AdguardTeam/golibs/errors"
	"github.com/AdguardTeam/golibs/logutil/slogutil"
)

// ServicesURLs 是 blocked services URLs 的配置
type ServicesURLs []string

// ServiceLoader 负责加载和缓存 blocked services 文件
type ServiceLoader struct {
	// urls 保存配置的服务文件URLs
	urls ServicesURLs
	// dataDir 是服务文件缓存目录
	dataDir string
	// services 存储已加载的服务
	services []blockedService
	// lastRefresh 记录最近的更新时间
	lastRefresh time.Time
	// mu 保护加载过程的并发安全
	mu sync.RWMutex
	// client 用于下载服务文件
	client *http.Client
	// logger 用于记录日志
	logger *slog.Logger
}

// NewServiceLoader 创建一个新的服务加载器
func NewServiceLoader(urls ServicesURLs, dataDir string, client *http.Client, logger *slog.Logger) *ServiceLoader {
	return &ServiceLoader{
		urls:     urls,
		dataDir:  dataDir,
		services: nil,
		client:   client,
		logger:   logger,
	}
}

// ServicesDir 返回服务文件缓存目录
func (s *ServiceLoader) ServicesDir() string {
	return filepath.Join(s.dataDir, "services")
}

// ensureServiceDir 确保服务文件缓存目录存在
func (s *ServiceLoader) ensureServiceDir() error {
	dir := s.ServicesDir()
	return os.MkdirAll(dir, 0755)
}

// LoadServices 加载所有配置的服务文件
func (s *ServiceLoader) LoadServices(ctx context.Context) ([]blockedService, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// 如果已经加载过并且在有效期内，直接返回缓存
	if s.services != nil && time.Since(s.lastRefresh) < 7*24*time.Hour {
		return s.services, nil
	}

	if err := s.ensureServiceDir(); err != nil {
		return nil, fmt.Errorf("创建服务缓存目录失败: %w", err)
	}

	var allServices []blockedService
	for _, url := range s.urls {
		services, err := s.loadFromURL(ctx, url)
		if err != nil {
			s.logger.ErrorContext(ctx, "从URL加载服务失败", slogutil.KeyError, err, "url", url)
			continue
		}
		allServices = append(allServices, services...)
	}

	if len(allServices) > 0 {
		s.services = allServices
		s.lastRefresh = time.Now()
	}

	return s.services, nil
}

// GetBlockedServices 获取所有已加载的 blocked services
func (s *ServiceLoader) GetBlockedServices(ctx context.Context) []blockedService {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if s.services != nil {
		return s.services
	}

	// 如果尚未加载，尝试加载
	services, err := s.LoadServices(ctx)
	if err != nil {
		s.logger.ErrorContext(ctx, "加载服务失败", slogutil.KeyError, err)
		// 如果加载失败，返回内置的服务列表
		return blockedServices
	}

	return services
}

// loadFromURL 从URL加载服务，如果缓存有效则使用缓存
func (s *ServiceLoader) loadFromURL(ctx context.Context, url string) ([]blockedService, error) {
	cacheFile := s.cacheFileName(url)
	cacheExists, cacheInfo, err := s.checkCache(cacheFile)
	if err != nil {
		return nil, fmt.Errorf("检查缓存失败: %w", err)
	}

	// 如果缓存存在且在3天内，直接使用缓存
	if cacheExists && time.Since(cacheInfo.ModTime()) < 3*24*time.Hour {
		return s.loadFromFile(cacheFile)
	}

	// 下载并更新缓存
	return s.downloadAndCache(ctx, url, cacheFile)
}

// cacheFileName 根据URL生成一个缓存文件名
func (s *ServiceLoader) cacheFileName(url string) string {
	// 使用简单的方法生成文件名，生产环境可能需要更复杂的处理
	fileName := fmt.Sprintf("services_%d.json", hash(url))
	return filepath.Join(s.ServicesDir(), fileName)
}

// hash 简单地将url转换为一个整数
func hash(s string) uint32 {
	h := uint32(0)
	for i := 0; i < len(s); i++ {
		h = h*31 + uint32(s[i])
	}
	return h
}

// checkCache 检查缓存文件是否存在
func (s *ServiceLoader) checkCache(cacheFile string) (bool, os.FileInfo, error) {
	info, err := os.Stat(cacheFile)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil, nil
		}
		return false, nil, err
	}
	return true, info, nil
}

// loadFromFile 从文件加载服务
func (s *ServiceLoader) loadFromFile(filename string) ([]blockedService, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, fmt.Errorf("读取服务文件失败: %w", err)
	}

	var hlServicesData hlServices
	if err := json.Unmarshal(data, &hlServicesData); err != nil {
		return nil, fmt.Errorf("解析服务文件失败: %w", err)
	}

	// 将hlServicesService转换为blockedService
	services := convertToBlockedServices(hlServicesData.BlockedServices)
	return services, nil
}

// downloadAndCache 下载服务文件并缓存
func (s *ServiceLoader) downloadAndCache(ctx context.Context, url, cacheFile string) ([]blockedService, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("创建HTTP请求失败: %w", err)
	}

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("HTTP请求失败: %w", err)
	}
	defer func() {
		err = errors.WithDeferred(err, resp.Body.Close())
	}()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP请求状态码错误: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取HTTP响应失败: %w", err)
	}

	// 保存到缓存
	if err := os.WriteFile(cacheFile, body, 0644); err != nil {
		s.logger.ErrorContext(ctx, "写入缓存失败", slogutil.KeyError, err, "file", cacheFile)
	}

	var hlServicesData hlServices
	if err := json.Unmarshal(body, &hlServicesData); err != nil {
		return nil, fmt.Errorf("解析服务文件失败: %w", err)
	}

	// 将hlServicesService转换为blockedService
	services := convertToBlockedServices(hlServicesData.BlockedServices)
	return services, nil
}

// convertToBlockedServices 将hlServicesService列表转换为blockedService列表
func convertToBlockedServices(hlServices []*hlServicesService) []blockedService {
	services := make([]blockedService, 0, len(hlServices))

	for _, service := range hlServices {
		services = append(services, blockedService{
			ID:      service.ID,
			Name:    service.Name,
			IconSVG: []byte(service.IconSVG),
			Rules:   service.Rules,
		})
	}

	return services
}
