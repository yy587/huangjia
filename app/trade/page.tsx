import { ArrowRight, Check, Container, FileText, PackageCheck, Ship } from "lucide-react";
import { SiteShell } from "../components/SiteShell";
import { sitePath } from "../lib/site-path";

const steps = [
  ["01", "Select products", "Add models and required quantities to your quote list."],
  ["02", "Confirm specifications", "Our sales team checks size, finish, packaging, MOQ and production availability."],
  ["03", "Receive quotation", "The formal quotation confirms price, Incoterm, lead time, validity and payment terms."],
  ["04", "Approve production", "Samples, colour references and order details are confirmed before production where applicable."],
  ["05", "Inspection & shipment", "Packing, inspection documents and shipping arrangements are coordinated against the confirmed contract."]
];

export default function TradePage() {
  return (
    <SiteShell>
      <main className="catalog-main trade-page">
        <section className="original-page-title">
          <span>Home / International Trade</span>
          <h1>International Procurement</h1>
          <p>A clear route from product selection to confirmed export quotation.</p>
        </section>
        <section className="trade-intro">
          <div><span className="micro-label">How it works</span><h2>Built for project and wholesale enquiries.</h2></div>
          <p>This website is a quotation platform, not an instant-payment store. Product availability, technical specifications, pricing, packing, shipping and payment terms are confirmed in a formal quotation before any order is placed.</p>
        </section>
        <section className="trade-steps">
          {steps.map(([number, title, copy]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{copy}</p></article>)}
        </section>
        <section className="trade-terms">
          <div className="trade-terms-heading"><span className="micro-label">Quotation checklist</span><h2>Information confirmed for every project.</h2></div>
          <div className="trade-term-grid">
            <article><PackageCheck /><h3>Product & packing</h3><p>Model, dimensions, finish, colour variation, quantity per carton or pallet, gross weight and packing method are confirmed by product.</p></article>
            <article><Container /><h3>MOQ & lead time</h3><p>Minimum order quantity, sample availability, production schedule and estimated readiness date are confirmed by the sales team.</p></article>
            <article><Ship /><h3>Delivery terms</h3><p>Available Incoterms, named port or destination, freight scope, insurance and customs responsibilities are stated in the quotation.</p></article>
            <article><FileText /><h3>Commercial documents</h3><p>Quotation validity, payment milestones and applicable packing, inspection and shipping documents are agreed before order confirmation.</p></article>
          </div>
        </section>
        <section className="trade-disclosure">
          <Check size={20} /><div><h3>No unverified promises</h3><p>MOQ, delivery time, certifications and trade terms vary by model and destination. Where these details are not published, the website marks them for sales confirmation rather than presenting assumed information.</p></div>
          <a href={sitePath("/products")}>Build a quote list <ArrowRight size={16} /></a>
        </section>
      </main>
    </SiteShell>
  );
}
