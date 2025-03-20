package control

import (
	"net/http"
)

// BlockedServicesController 处理与阻止服务相关的API请求
type BlockedServicesController struct {
	// 这里可以添加所需的依赖项
}

// NewBlockedServicesController 创建一个新的阻止服务控制器
func NewBlockedServicesController() *BlockedServicesController {
	return &BlockedServicesController{}
}

// Get 处理获取阻止服务列表的请求
// GET /control/blocked_services/get
func (c *BlockedServicesController) Get(w http.ResponseWriter, r *http.Request) {
	// 实现获取阻止服务列表的逻辑
	// 例如：
	data := map[string]interface{}{
		"services": []string{}, // 这里应该返回实际的阻止服务列表
		"enabled":  false,      // 是否启用阻止服务功能
	}

	serveJSON(w, r, data)
}
