'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function ContactForm({ open: externalOpen, onClose }) {
  // 支持受控或内部状态（兼容旧用法）
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const el = contentRef.current?.querySelector('input, textarea');
      if (el) el.focus();
    }
  }, [isOpen]);

  const setOpenInternal = (v) => {
    if (isControlled) {
      // noop: parent should control
    } else {
      setInternalOpen(v);
    }
  };

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return '请填写所有必填项';
    if (name.length > 100) return '姓名过长（最大 100 字符）';
    if (message.length > 2000) return '留言内容过长（最大 2000 字符）';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return '邮箱格式不正确';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setFeedback({ type: 'error', text: err });
    if (honeypot) return setFeedback({ type: 'error', text: '检测到疑似机器人' });

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || '发送失败');

      setFeedback({ type: 'success', text: '消息已发送，感谢留言！' });
      setName(''); setEmail(''); setMessage('');
      // 关闭：优先调用父 onClose，否则关闭内部状态
      if (onClose) onClose(); else setOpenInternal(false);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || '发送时发生错误' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">

      <div
        id="contact-panel"
        ref={contentRef}
        className={`contact-panel ${isOpen ? 'open' : ''}`}
        role="region"
        aria-hidden={!isOpen}
      >
        {isOpen && (
          <form onSubmit={handleSubmit} aria-label="联系表单" className="contact-form-inline">
          <div className="hp" aria-hidden style={{ display: 'none' }}>
            <label>如果你是人类，请不要填写：
              <input value={honeypot} onChange={(e)=>setHoneypot(e.target.value)} name="hp" autoComplete="off" />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span className="label">姓名</span>
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                maxLength={100}
                required
                placeholder="你的名字"
                disabled={loading}
              />
            </label>

            <label className="field">
              <span className="label">邮箱</span>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                disabled={loading}
              />
            </label>
          </div>

          <label className="field">
            <span className="label">留言</span>
            <textarea
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              maxLength={2000}
              required
              placeholder="写下你的信息..."
              disabled={loading}
            />
          </label>

          <div className="actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? '发送中…' : '发送留言'}
            </button>
            <button type="button" className="btn btn-muted" onClick={()=>{ if (onClose) onClose(); else setOpenInternal(false); }}>
              取消
            </button>
          </div>

          {feedback && (
            <p className={`feedback ${feedback.type === 'error' ? 'error' : 'success'}`} role="status">
              {feedback.text}
            </p>
          )}
          </form>
        )}
      </div>
    </div>
  );
}
