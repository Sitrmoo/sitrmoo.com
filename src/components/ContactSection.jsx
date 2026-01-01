'use client';
import React, { useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <section className="contact-section">
      <button
        type="button"
        className="contact-heading"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="contact-panel"
      >
        <h2>给我留言</h2>
      </button>

      <ContactForm open={open} onClose={close} />

      <style jsx>{`
        .contact-heading { background: none; border: 0; padding: 0; cursor: pointer; text-align: left }
        .contact-heading h2 { font-size: 1.3rem; color: var(--primary); margin: 8px 0; }
        .contact-heading:focus { outline: none; box-shadow: 0 0 0 4px rgba(43,175,144,0.06); border-radius: 6px }
      `}</style>
    </section>
  );
}
