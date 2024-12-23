对原库所做的修改:

- client(Frontend)
  - 隐藏
    - 菜单隐藏: 加密设置, 客户端设置, DHCP 设置,` SETTINGS_URLS.encryption`, `SETTINGS_URLS.clients`, `SETTINGS_URLS.dhcp`
    - 隐藏安全浏览, 父母控制, `safebrowsing_enabled`, `parental_enabled`
    - 隐藏 cache_size 设置, `CACHE_CONFIG_FIELDS`
    - 隐藏限速设置, `ratelimit_subnet_len_ipv4`
    - 隐藏选用最快的 IP, `UPSTREAM_MODE_NAME`
    - 隐藏日志记录修改, `query_log_retention`
    - 隐藏统计记录修改, `statistics_retention`
    - 隐藏设置指导不必要的内容, `install_devices_router_desc`
    - 隐藏本地客户端查询, `local_ptr_upstreams`
  - 增加
    - 登录界面账号自动填充子域名
    - 设置指导只显示必要的信息
  - 修改
    - AdguardPrivate 不提供非加密的 DNS, 所有`plain_dns`翻译修改为`DNS-over-TLS`,`"plain_dns": ".+",`
    - 修改 Logo 和标题
- internal(backend)
  - 增加
    - 证书定时重载
    - 其他协议的 ratelimit 支持
  - 修改
    - 使用 `github.com/jqknono/dnsproxy` 替换 `github.com/AdguardTeam/dnsproxy`
    - 原库不支持定时重载证书, 增加协程每隔三天重载证书, `case <-time.After(3 * 24 * time.Hour):`
    - 限制指定特定域名的上游服务器, 特定域名数量限制为`255`
    - 限制并行请求模式下, 生效的上游 DNS 数量限制为`5`
    - 限制黑白名单规则各 `100w` 条上限, `dns_blocklists_desc`, `maximumCount := 1000000`
- dnsproxy
  - 原库仅支持 plain UDP 请求的 ratelimit, 修改增加了对其他协议的 ratelimit 支持, `p.isRatelimited(ip)`
- k8s
  - 由负载均衡器处理加密证书路由, DoH 代理到 HTTP, DoT 代理到 UDP 请求
  - HTTP 请求限制每秒 30, 允许突发量 60
  - UDP 请求限制每秒 30

## 统一库

```shell
# github.com/AdguardTeam/dnsproxy
cp -R ../dnsproxy/fastip/ .
cp -R ../dnsproxy/internal/ .
cp -R ../dnsproxy/proxy/ .
cp -R ../dnsproxy/proxyutil/ .
cp -R ../dnsproxy/upstream/ .
```
