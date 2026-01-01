import { NextResponse } from 'next/server';

// Dev-only in-memory rate limiter (not reliable in serverless / multi-instance env)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 5;
const rateMap = new Map();

function getIP(req) {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

function escapeHtml(s = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot, recaptchaToken } = body || {};

    if (honeypot) return NextResponse.json({ ok: false, message: 'bot detected' }, { status: 400 });
    if (!name || !email || !message) return NextResponse.json({ ok: false, message: '缺少字段' }, { status: 400 });
    if (name.length > 100 || message.length > 2000) return NextResponse.json({ ok: false, message: '输入过长' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, message: '邮箱格式错误' }, { status: 400 });

    // Optional: reCAPTCHA server-side verification
    if (process.env.RECAPTCHA_SECRET) {
      if (!recaptchaToken) return NextResponse.json({ ok: false, message: '缺少 reCAPTCHA token' }, { status: 400 });
      const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptchaToken)}`
      });
      const j = await r.json();
      if (!j.success || (j.score !== undefined && j.score < 0.5)) {
        return NextResponse.json({ ok: false, message: 'reCAPTCHA 验证失败' }, { status: 400 });
      }
    }

    // Rate limiting (dev fallback). For production use Upstash/Redis/Vercel KV.
    const ip = getIP(req);
    const now = Date.now();
    const entry = rateMap.get(ip) || { count: 0, first: now };
    if (now - entry.first < RATE_LIMIT_WINDOW) {
      entry.count += 1;
    } else {
      entry.count = 1;
      entry.first = now;
    }
    rateMap.set(ip, entry);
    if (entry.count > MAX_PER_WINDOW) {
      return NextResponse.json({ ok: false, message: '请求过于频繁，请稍后再试' }, { status: 429 });
    }

    // --- Telegram push ---
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return NextResponse.json({ ok: false, message: '服务器未配置发送目标' }, { status: 500 });
    }

    const text = `<b>新消息来自个人网站</b>\n<b>姓名:</b> ${escapeHtml(name)}\n<b>邮箱:</b> ${escapeHtml(email)}\n\n${escapeHtml(message)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error('Telegram error', errText);
      return NextResponse.json({ ok: false, message: '向 Telegram 发送失败' }, { status: 500 });
    }

    // Optional: persist messages to DB here (e.g., Supabase, Postgres)

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: '服务器异常' }, { status: 500 });
  }
}
