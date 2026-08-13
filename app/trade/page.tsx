import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "../components/SiteShell";
import { sitePath } from "../lib/site-path";

const steps = [
  ["01", "Choose products", "Browse the catalogue and add the required models and estimated quantities to one quote list."],
  ["02", "Send project details", "Tell us the destination market, required sizes, finish, quantity and preferred delivery time."],
  ["03", "Confirm specifications", "Our team checks availability, packing, MOQ, lead time and any technical requirements with you."],
  ["04", "Receive a formal quotation", "The quotation records confirmed products, pricing, trade terms, production schedule and validity."],
  ["05", "Approve and coordinate delivery", "After commercial terms are accepted, production, inspection documents and shipment are coordinated."]
];

const preparation = [
  ["Products", "Model number, size, finish and estimated quantity"],
  ["Project", "Application, destination country and required date"],
  ["Delivery", "Preferred port, address or requested Incoterm, if known"],
  ["Documents", "Any certification, packing or inspection requirements"]
];

export default function TradePage() {
  return (
    <SiteShell>
      <main className="catalog-main trade-page">
        <section className="trade-guide-hero">
          <span className="trade-guide-eyebrow">International project sourcing</span>
          <h1>How to purchase from Huangjia</h1>
          <p>This page explains how overseas distributors, project teams and wholesale buyers move from product selection to a confirmed quotation and delivery arrangement.</p>
          <div className="trade-guide-actions">
            <a href={sitePath("/products")}>Browse products <ArrowRight size={16} /></a>
            <a href={sitePath("/cart")}>Open quote list <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="trade-guide-purpose">
          <span className="trade-guide-section-label">Purpose of this page</span>
          <div>
            <h2>A clear route from selection to quotation.</h2>
            <p>Huangjia supplies building materials through project and wholesale enquiries. The website helps you select products and prepare one complete request. It does not take instant online payment. Final specifications, availability, price, packing and shipping terms are confirmed in writing before an order is placed.</p>
          </div>
        </section>

        <section className="trade-guide-process">
          <header>
            <span className="trade-guide-section-label">Purchasing process</span>
            <h2>Five steps from enquiry to delivery.</h2>
          </header>
          <div className="trade-guide-step-list">
            {steps.map(([number, title, copy]) => (
              <article key={number}>
                <small>{number}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="trade-guide-prepare">
          <header>
            <span className="trade-guide-section-label">Before requesting a quote</span>
            <h2>Prepare these four details.</h2>
            <p>Complete information helps the sales team check the correct product and respond more efficiently.</p>
          </header>
          <div className="trade-guide-checklist">
            {preparation.map(([title, copy], index) => (
              <article key={title}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="trade-guide-final">
          <div>
            <Check size={20} />
            <span className="trade-guide-section-label">Clear commercial confirmation</span>
            <h2>Only confirmed information enters the quotation.</h2>
            <p>MOQ, lead time, certification, packing and delivery terms vary by product and destination. Our team confirms these details for your project instead of presenting assumptions.</p>
          </div>
          <a href={sitePath("/products")}>Start with the product catalogue <ArrowRight size={17} /></a>
        </section>
      </main>
    </SiteShell>
  );
}
