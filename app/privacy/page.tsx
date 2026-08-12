import { SiteShell } from "../components/SiteShell";
import { catalog } from "../lib/catalog";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <main className="catalog-main policy-page">
        <section className="original-page-title"><span>Home / Privacy</span><h1>Privacy Notice</h1><p>How enquiry information submitted through this website is used.</p></section>
        <article>
          <h2>Information we collect</h2><p>When you prepare or send an enquiry, you may provide your name, company, email address, telephone or WhatsApp number, destination market, requested products, quantities and project details.</p>
          <h2>Why we use it</h2><p>We use this information to respond to enquiries, verify specifications, prepare quotations, coordinate samples and discuss potential orders. The quote list stored in your browser remains on your device unless you include it in an enquiry.</p>
          <h2>Sharing and retention</h2><p>Enquiry information should only be shared with personnel and service providers involved in responding to the request, commercial communication or delivery planning. Information should be retained only as long as reasonably needed for those purposes and applicable legal obligations.</p>
          <h2>Your choices</h2><p>You may ask what personal information is held about you, request a correction or deletion where applicable, or ask to stop non-essential communications.</p>
          <h2>Contact</h2><p>For privacy questions or requests, contact <a href={`mailto:${catalog.contact.email}`}>{catalog.contact.email}</a>. This notice should be reviewed with qualified legal counsel before the website is used as a full production transaction service in every target market.</p>
          <small>Last updated: August 2026</small>
        </article>
      </main>
    </SiteShell>
  );
}
