package dnsforward

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/AdguardTeam/dnsproxy/proxy"
	"github.com/AdguardTeam/dnsproxy/upstream"
	"github.com/AdguardTeam/golibs/errors"
	"github.com/AdguardTeam/golibs/log"
	"github.com/AdguardTeam/golibs/stringutil"
)

// defaultRulesetsDir is the directory where ruleset files are stored.
const defaultRulesetsDir = "data/rulesets"

// ruleCacheExpire is the time after which the ruleset cache is considered expired.
const ruleCacheExpire = 7 * 24 * time.Hour // 7 days

// rulesetManager manages the download and parsing of rulesets.
type rulesetManager struct {
	rulesetsDir string
}

// newRulesetManager creates a new rulesetManager with the specified directory.
// If dir is empty, the default directory is used.
func newRulesetManager(dir string) *rulesetManager {
	if dir == "" {
		dir = defaultRulesetsDir
	}
	return &rulesetManager{rulesetsDir: dir}
}

// ensureRulesetsDir ensures that the rulesets directory exists.
func (m *rulesetManager) ensureRulesetsDir() error {
	return os.MkdirAll(m.rulesetsDir, 0o755)
}

// downloadRuleset downloads a ruleset from the URL and saves it to a file.
// If the file already exists and is not older than ruleCacheExpire, it is not downloaded again.
func (m *rulesetManager) downloadRuleset(url string) (string, error) {
	if err := m.ensureRulesetsDir(); err != nil {
		return "", fmt.Errorf("creating rulesets directory: %w", err)
	}

	// Generate a filename based on the URL
	filename := filepath.Join(m.rulesetsDir, filenameFromURL(url))

	// Check if the file already exists and is recent enough
	if info, err := os.Stat(filename); err == nil {
		modTime := info.ModTime()
		if time.Since(modTime) < ruleCacheExpire {
			log.Debug("dnsforward: ruleset %s is fresh, not downloading", url)
			return filename, nil
		}
	}

	log.Debug("dnsforward: downloading ruleset from %s", url)
	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("downloading ruleset: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("downloading ruleset: HTTP status %d", resp.StatusCode)
	}

	f, err := os.Create(filename)
	if err != nil {
		return "", fmt.Errorf("creating ruleset file: %w", err)
	}
	defer f.Close()

	_, err = io.Copy(f, resp.Body)
	if err != nil {
		return "", fmt.Errorf("writing ruleset file: %w", err)
	}

	return filename, nil
}

// filenameFromURL generates a safe filename from a URL.
func filenameFromURL(url string) string {
	// Remove common prefixes
	url = strings.TrimPrefix(url, "http://")
	url = strings.TrimPrefix(url, "https://")

	// Replace special characters with underscore
	replacer := strings.NewReplacer(
		"/", "_",
		":", "_",
		"?", "_",
		"&", "_",
		"=", "_",
		" ", "_",
	)
	return replacer.Replace(url)
}

// parseRuleset parses a ruleset file and returns a list of domains.
func (m *rulesetManager) parseRuleset(filename string) ([]string, error) {
	f, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("opening ruleset file: %w", err)
	}
	defer f.Close()

	var domains []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		// Skip empty lines and comments
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		domains = append(domains, line)
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("scanning ruleset file: %w", err)
	}

	return domains, nil
}

// prepareAlternateUpstreams prepares alternate upstream configurations based on ruleset files and alternate DNS settings.
func prepareAlternateUpstreams(alternateDNS []string, alterateRulesets []string, rulesetsDir string, opts *upstream.Options) (*proxy.UpstreamConfig, error) {
	if len(alternateDNS) == 0 || len(alterateRulesets) == 0 {
		return nil, nil
	}

	alternateDNS = stringutil.FilterOut(alternateDNS, IsCommentOrEmpty)
	if len(alternateDNS) == 0 {
		return nil, nil
	}

	// Create a ruleset manager
	manager := newRulesetManager(rulesetsDir)

	// Download and parse each ruleset
	var allDomains []string
	for _, rulesetURL := range alterateRulesets {
		if IsCommentOrEmpty(rulesetURL) {
			continue
		}

		filename, err := manager.downloadRuleset(rulesetURL)
		if err != nil {
			log.Error("dnsforward: failed to download ruleset %s: %s", rulesetURL, err)
			continue
		}

		domains, err := manager.parseRuleset(filename)
		if err != nil {
			log.Error("dnsforward: failed to parse ruleset %s: %s", filename, err)
			continue
		}

		log.Debug("dnsforward: parsed %d domains from ruleset %s", len(domains), rulesetURL)
		allDomains = append(allDomains, domains...)
	}

	if len(allDomains) == 0 {
		return nil, nil
	}

	// Create configuration with domain-specific rules
	uc := &proxy.UpstreamConfig{
		Upstreams:               []upstream.Upstream{},
		DomainReservedUpstreams: map[string][]upstream.Upstream{},
	}

	upstreams, err := proxy.ParseUpstreamsConfig(alternateDNS, opts)
	if err != nil {
		return nil, errors.WithDeferred(err, upstreams.Close())
	}

	// Add each domain to the domain-specific upstreams
	for _, domain := range allDomains {
		uc.DomainReservedUpstreams[domain] = upstreams.Upstreams
	}

	return uc, nil
}
