# 流月的个人网站
这是流月的个人网站，用于展示自己。

## 开发笔记 — RSS 聚合（服务器端）
- 已实现：在 `src/app/api/rss/route.js` 上创建了一个服务器端 API，用来拉取并解析 `https://blog.sitrmoo.com/rss.xml`，并以 JSON 返回文章列表。
- 缓存：实现了简单的内存缓存，TTL 为 10 分钟，减少对源站的请求频率。

如何验证：
1. 启动开发服务器：`pnpm dev`（或 `npm run dev`）。
2. 打开 `http://localhost:3000/blog`，确认页面能成功加载文章列表。
3. 在浏览器 Network 面板检查 `/api/rss` 的响应（应返回 JSON，包含 `items` 字段）。
4. 可通过修改 `src/app/api/rss/route.js` 中的 `TTL` 来调整缓存时长进行测试。

注意：内存缓存只在同一 server process 内有效；在使用无状态 serverless 环境时，建议替换为外部缓存（Redis 等）或在构建阶段拉取并缓存。
