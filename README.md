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

## 联系表单与 Telegram 推送
已在项目中添加一个联系表单和后端 API，用于把访客留言推送到你的 Telegram。

- 前端组件：`src/components/ContactForm.jsx`（基于 React Hooks，包含隐藏的 honeypot、防止常见滥用的长度与格式校验）
- 后端 API（App Router）：`src/app/api/contact/route.js`（支持 reCAPTCHA 后端验证，可选 Upstash/Redis 作生产限流）

环境变量：请在 Vercel 或本地 `.env` 中配置下面变量（查看 `.env.example`）：
- `TELEGRAM_BOT_TOKEN` - BotFather 获得的 token
- `TELEGRAM_CHAT_ID` - 你的 chat id
- 可选：`RECAPTCHA_SECRET` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- 可选：`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`（生产限流）

部署要点：不要在客户端暴露私钥；生产请使用外部持久限流（Upstash 或 Vercel KV）并启用 reCAPTCHA 或 Turnstile 以防止滥用。
