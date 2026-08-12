"use client";

import { ArrowRight, Mail, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "../components/SiteShell";
import { useInquiry } from "../components/InquiryProvider";
import { catalog, primaryModel } from "../lib/catalog";
import { sitePath } from "../lib/site-path";

export default function CartPage() {
  const { items, removeItem, setQuantity, clear, count } = useInquiry();
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState({ name: "", company: "", email: "", country: "", delivery: "" });
  const [formError, setFormError] = useState("");
  const [quoteStep, setQuoteStep] = useState<1 | 2>(1);

  const sendEnquiry = () => {
    if (!customer.name.trim() || !customer.email.trim() || !customer.country.trim()) {
      setFormError("Please enter your name, email and destination country.");
      return;
    }
    setFormError("");
    const lines = items.map(
      (item, index) =>
        `${index + 1}. ${primaryModel(item.name)} (${item.category}) — Qty: ${item.quantity}`
    );
    const subject = encodeURIComponent(`Huangjia product enquiry — ${count} item${count === 1 ? "" : "s"}`);
    const body = encodeURIComponent(
      [
        "Hello Huangjia team,",
        "",
        "Please quote the following selection:",
        ...lines,
        "",
        `Name: ${customer.name}`,
        `Company: ${customer.company || "—"}`,
        `Email: ${customer.email}`,
        `Destination country: ${customer.country}`,
        `Required delivery date: ${customer.delivery || "To be confirmed"}`,
        "",
        notes ? `Project notes:\n${notes}` : "Project notes:",
        "",
        "Thank you."
      ].join("\n")
    );
    window.location.href = `mailto:${catalog.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="original-page-title">
          <span>Home / Quote List</span>
          <h1>Quote List</h1>
          <p>{count} Items</p>
        </section>
        <div className={`quote-progress quote-progress-step-${quoteStep}`} aria-label="Quote request steps">
          <button className={quoteStep === 1 ? "is-active" : "is-complete"} onClick={() => setQuoteStep(1)}><b>01</b> Confirm products</button>
          <button className={quoteStep === 2 ? "is-active" : ""} onClick={() => setQuoteStep(2)}><b>02</b> Contact details</button>
          <span><b>03</b> Send request</span>
        </div>
        {items.length ? (
          <section className={`selection-layout quote-step-${quoteStep}`}>
            <div className="selection-items">
              <div className="selection-table-heading">
                <span>{items.length} product group{items.length === 1 ? "" : "s"}</span>
                <button onClick={clear}>Clear quote list</button>
              </div>
              {items.map((item, index) => (
                <article key={item.slug} className="selection-item">
                  <span className="selection-index">{String(index + 1).padStart(2, "0")}</span>
              <a href={sitePath(`/product/${item.slug}`)} className="selection-image">
                    <img src={item.image} alt={primaryModel(item.name)} />
                  </a>
                  <div>
                    <small>{item.category.replace("BASIR", "BASIN")}</small>
                <h2><a href={sitePath(`/product/${item.slug}`)}>{primaryModel(item.name)}</a></h2>
                    <span>{item.slug.replace("display-", "Product group ")}</span>
                  </div>
                  <div className="quantity-control">
                    <button aria-label={`Decrease ${primaryModel(item.name)} quantity`} onClick={() => setQuantity(item.slug, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase ${primaryModel(item.name)} quantity`} onClick={() => setQuantity(item.slug, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="remove-selection" onClick={() => removeItem(item.slug)} aria-label="Remove item">
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
              <button className="quote-mobile-next" type="button" onClick={() => { setQuoteStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                Continue to contact details <ArrowRight size={16} />
              </button>
            </div>
            <aside className="selection-summary">
              <button className="quote-mobile-back" type="button" onClick={() => setQuoteStep(1)}>Back to products</button>
              <span className="micro-label">Request a quote</span>
              <h2>Ready to enquire?</h2>
              <div><span>Product groups</span><b>{items.length}</b></div>
              <div><span>Total quantity</span><b>{count}</b></div>
              <div><span>Quotation status</span><b>Pending sales confirmation</b></div>
              <div className="checkout-fields">
                <label>Your name *<input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Contact person" /></label>
                <label>Company<input value={customer.company} onChange={(event) => setCustomer({ ...customer, company: event.target.value })} placeholder="Company name" /></label>
                <label>Email *<input type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="name@company.com" /></label>
                <label>Destination country *<input value={customer.country} onChange={(event) => setCustomer({ ...customer, country: event.target.value })} placeholder="Country / market" /></label>
                <label>Required delivery date<input type="date" value={customer.delivery} onChange={(event) => setCustomer({ ...customer, delivery: event.target.value })} /></label>
              </div>
              <label>
                Project notes
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Sizes, destination, timeline or other requirements…"
                />
              </label>
              {formError && <p className="checkout-error" role="alert">{formError}</p>}
              <button onClick={sendEnquiry}>
                <Mail size={17} /> Submit quote request <ArrowRight size={17} />
              </button>
              <p>No payment is taken online. Our team will confirm availability, specifications, shipping and pricing directly.</p>
              <p>By sending an enquiry, you acknowledge the <a href={sitePath("/privacy")}>privacy notice</a>. No order is binding until a formal quotation and commercial terms are accepted.</p>
              <a className="continue-shopping" href={sitePath("/products")}>Continue browsing products <ArrowRight size={14} /></a>
            </aside>
          </section>
        ) : (
          <section className="empty-selection">
            <span>0</span>
            <h2>Your quote list is empty.</h2>
            <p>Browse the full catalogue and add any products you would like us to quote.</p>
            <a href={sitePath("/products")}>Explore products <ArrowRight size={17} /></a>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
