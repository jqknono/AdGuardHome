过去的实现:

- scripts/blocked-services/main.go 文件用于下载 services.json, 并解析为 go 代码, 将 services 规则固化在了二进制文件内.

需要改为:

- 在 AdguardHome.yaml 文件中增加 services 文件的 urls 参数, 在运行时下载指定文件, 缓存在 data/services 文件夹下, 下载的文件格式见 scripts/blocked-services/services.schema.json.
- 在前端请求到`#blocked_services`模块时, 开始下载并解析文件, 文件的修改时间在 7 天内则不要再次下载.
- 点击保存后, 使选中的规则生效.
