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

  const sendEnquiry = () => {
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
        notes ? `Project notes:\n${notes}` : "Project notes:",
        "",
        "Destination country:",
        "Required delivery date:",
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
          <span>Home / Cart</span>
          <h1>Shopping Cart</h1>
          <p>{count} Items</p>
        </section>
        {items.length ? (
          <section className="selection-layout">
            <div className="selection-items">
              <div className="selection-table-heading">
                <span>{items.length} product group{items.length === 1 ? "" : "s"}</span>
                <button onClick={clear}>Clear selection</button>
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
                    <button onClick={() => setQuantity(item.slug, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => setQuantity(item.slug, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="remove-selection" onClick={() => removeItem(item.slug)} aria-label="Remove item">
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
            <aside className="selection-summary">
              <span className="micro-label">Request a quote</span>
              <h2>Ready to enquire?</h2>
              <div><span>Product groups</span><b>{items.length}</b></div>
              <div><span>Total quantity</span><b>{count}</b></div>
              <label>
                Project notes
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Sizes, destination, timeline or other requirements…"
                />
              </label>
              <button onClick={sendEnquiry}>
                <Mail size={17} /> Email this selection <ArrowRight size={17} />
              </button>
              <p>No payment is taken online. Our team will confirm availability, specifications, shipping and pricing directly.</p>
            </aside>
          </section>
        ) : (
          <section className="empty-selection">
            <span>0</span>
            <h2>Your selection is empty.</h2>
            <p>Browse the full catalogue and add any products you would like us to quote.</p>
            <a href={sitePath("/products")}>Explore products <ArrowRight size={17} /></a>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
