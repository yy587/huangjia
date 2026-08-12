"use client";

import { ArrowRight, Check, Mail, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { catalog } from "../lib/catalog";

export function QuickQuotePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstField.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Quick quote from ${form.get("name") || "website visitor"}`);
    const body = encodeURIComponent([
      `Name: ${form.get("name") || ""}`,
      `Company: ${form.get("company") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Phone / WhatsApp: ${form.get("phone") || ""}`,
      `Country / market: ${form.get("market") || ""}`,
      "",
      String(form.get("message") || ""),
    ].join("\n"));
    setSent(true);
    window.location.href = `mailto:${catalog.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`quick-quote-layer${open ? " is-open" : ""}`} aria-hidden={!open}>
      <button className="quick-quote-backdrop" aria-label="Close quote form" onClick={onClose} />
      <aside className="quick-quote-panel" role="dialog" aria-modal="true" aria-labelledby="quick-quote-title">
        <button className="quick-quote-close" type="button" aria-label="Close quote form" onClick={onClose}>
          <X size={22} />
        </button>
        <span className="micro-label">Quick project quote</span>
        <h2 id="quick-quote-title">Tell us what you need.</h2>
        <p>Send the product model, quantity and destination. Our sales team will prepare a confirmed quotation.</p>
        <form onSubmit={submit}>
          <div className="quick-quote-row">
            <label>Name *<input ref={firstField} name="name" required placeholder="Your name" /></label>
            <label>Company<input name="company" placeholder="Company name" /></label>
          </div>
          <div className="quick-quote-row">
            <label>Email *<input name="email" type="email" required placeholder="name@company.com" /></label>
            <label>Phone / WhatsApp<input name="phone" placeholder="+00 000 000 000" /></label>
          </div>
          <label>Country / market<input name="market" placeholder="Where is your project?" /></label>
          <label>Products and quantity *<textarea name="message" required rows={5} placeholder="Model, quantity, specifications and delivery date…" /></label>
          <button className="quick-quote-submit" type="submit">
            {sent ? <><Check size={17} /> Opening your email…</> : <><Mail size={17} /> Send quick quote <ArrowRight size={17} /></>}
          </button>
        </form>
        <small>Or email us directly at <a href={`mailto:${catalog.contact.email}`}>{catalog.contact.email}</a></small>
      </aside>
    </div>
  );
}
