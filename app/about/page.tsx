import { ArrowRight, Check, Globe2, Layers3, PackageCheck } from "lucide-react";
import { SiteShell } from "../components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="page-hero about-hero">
          <div>
            <span className="micro-label">About Huangjia</span>
            <h1>A practical partner<br />for <em>complete spaces.</em></h1>
          </div>
          <p>
            Foshan product knowledge, coordinated sourcing and responsive project
            support—under one roof.
          </p>
        </section>

        <section className="about-image-band">
          <img src="/images/team-client.jpg" alt="Huangjia team working with international clients" />
          <div>
            <span>Since Foshan, China</span>
            <strong>One source.<br />More possibilities.</strong>
          </div>
        </section>

        <section className="about-story">
          <div>
            <span className="micro-label">Who we are</span>
            <h2>Materials backed by<br />real manufacturing insight.</h2>
          </div>
          <div className="about-copy">
            <p>
              HUANGJIA is a building material company dedicated to providing
              high-quality products for distributors, designers and project teams.
              We specialize in developing and sourcing advanced building materials
              around specific customer needs.
            </p>
            <p>
              We combine current technology, consistent quality standards and
              responsive after-sales support. Our aim is simple: reliable products,
              clear communication and a long-term win-win relationship with every
              customer.
            </p>
            <a className="solid-link" href="/contact">
              Talk to our team <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="about-values">
          {[
            {
              icon: Layers3,
              number: "01",
              title: "Complete range",
              copy: "Tile, slabs, mosaics, wall panels, sanitaryware and coordinated accessories."
            },
            {
              icon: Check,
              number: "02",
              title: "Quality focus",
              copy: "Product selection and supply guided by consistent specifications and project requirements."
            },
            {
              icon: Globe2,
              number: "03",
              title: "Export experience",
              copy: "Clear communication, sampling and shipment support for customers around the world."
            },
            {
              icon: PackageCheck,
              number: "04",
              title: "Project service",
              copy: "One coordinated selection and enquiry process from early specification to delivery."
            }
          ].map((value) => (
            <article key={value.number}>
              <div><span>{value.number}</span><value.icon size={22} /></div>
              <h3>{value.title}</h3>
              <p>{value.copy}</p>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
