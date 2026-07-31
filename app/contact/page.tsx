"use client";

import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { SiteShell } from "../components/SiteShell";
import { catalog } from "../lib/catalog";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${form.get("name") || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.get("name") || ""}`,
        `Company: ${form.get("company") || ""}`,
        `Email: ${form.get("email") || ""}`,
        `Phone / WhatsApp: ${form.get("phone") || ""}`,
        `Market: ${form.get("market") || ""}`,
        "",
        String(form.get("message") || "")
      ].join("\n")
    );
    setSent(true);
    window.location.href = `mailto:${catalog.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="original-page-title">
          <span>Home / Contact Us</span>
          <h1>Contact Us</h1>
        </section>
        <section className="contact-page-grid">
          <div className="contact-details">
            <div>
              <span className="micro-label">Direct contact</span>
              <h2>{catalog.contact.company}</h2>
            </div>
            <a href={`mailto:${catalog.contact.email}`}>
              <Mail size={19} />
              <span><small>Sales email</small>{catalog.contact.email}</span>
            </a>
            <a href={`tel:${catalog.contact.phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={19} />
              <span><small>Telephone / WhatsApp</small>{catalog.contact.phone}</span>
            </a>
            <div className="contact-address">
              <MapPin size={19} />
              <span><small>Location</small>Foshan, Guangdong, China</span>
            </div>
            <div className="contact-note">
              <Check size={18} />
              <p>For the fastest response, include product model, quantity, destination country and required delivery date.</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-heading">
              <span className="micro-label">Project enquiry</span>
              <h2>Start a conversation</h2>
              <p>Fields marked * are required.</p>
            </div>
            <div className="field-row">
              <label>Name *<input name="name" required placeholder="Your name" /></label>
              <label>Company<input name="company" placeholder="Company name" /></label>
            </div>
            <div className="field-row">
              <label>Email *<input name="email" type="email" required placeholder="name@company.com" /></label>
              <label>Phone / WhatsApp<input name="phone" placeholder="+00 000 000 000" /></label>
            </div>
            <label>Country / market<input name="market" placeholder="Where is your project?" /></label>
            <label>Project details *<textarea name="message" required rows={6} placeholder="Tell us about the products, quantities and timeline you need…" /></label>
            <button type="submit">
              {sent ? "Opening your email…" : "Send project enquiry"} <ArrowRight size={17} />
            </button>
          </form>
        </section>
      </main>
    </SiteShell>
  );
}
