"use client";

import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./components/LanguageProvider";

const collections = [
  {
    name: "Ceramic Tile",
    detail: "Polished · Rustic · Glazed",
    image: "/images/tile-living.jpg",
    className: "collection-large"
  },
  {
    name: "Large Format Slab",
    detail: "Statement-scale surfaces",
    image: "/images/slab-white.jpg",
    className: ""
  },
  {
    name: "Mosaic",
    detail: "Texture in every detail",
    image: "/images/mosaic-room.jpg",
    className: ""
  },
  {
    name: "Wall Panel",
    detail: "Wood · PET · Ripple",
    image: "/images/wall-panel.jpg",
    className: ""
  },
  {
    name: "Bathroom",
    detail: "Sanitary & hardware systems",
    image: "/images/bathroom.jpg",
    className: "collection-wide"
  }
];

const projects = [
  {
    key: "living",
    label: "Living",
    number: "01",
    title: "Quiet luxury, built from the ground up.",
    description:
      "Warm-veined porcelain creates a continuous visual plane while balancing daily durability with a refined residential feel.",
    meta: "Residential · Porcelain slab · 1200 × 2400 mm",
    image: "/images/hero-living-clean.png"
  },
  {
    key: "dining",
    label: "Dining",
    number: "02",
    title: "Material warmth for social spaces.",
    description:
      "A composed palette of tactile wall panels and neutral flooring gives hospitality-inspired depth to an everyday dining room.",
    meta: "Residential · Wall panel + tile system",
    image: "/images/dining.jpg"
  },
  {
    key: "bathroom",
    label: "Bathroom",
    number: "03",
    title: "A complete room, one coordinated source.",
    description:
      "Surfaces, sanitaryware and fittings are developed as one practical specification—easier to select, sample and deliver.",
    meta: "Hospitality · Tile + sanitary system",
    image: "/images/bathroom-green.jpg"
  }
];

function ArrowLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="arrow-link">
      {children}
      <ArrowRight size={17} strokeWidth={1.7} />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const project = projects[activeProject];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="utility">
        <span>Foshan · China</span>
        <span className="utility-center">
          Tile & building material solutions for global projects
        </span>
        <LanguageToggle compact />
      </div>

      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a href="/" className="brand" aria-label="SHIE home">
          <span className="brand-mark">SHIE</span>
          <span className="brand-sub">Huangjia surfaces</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/products">Products</a>
          <a href="#projects">Projects</a>
          <a href="#capabilities">Capabilities</a>
          <a href="/about">About</a>
        </nav>
        <div className="header-actions">
          <a href="/search" aria-label="Search" className="icon-button">
            <Search size={19} />
          </a>
          <a href="/contact" className="header-cta">
            Request samples <ArrowRight size={15} />
          </a>
          <button
            aria-label="Open menu"
            className="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}>
        <button
          className="mobile-close"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={26} />
        </button>
        <span className="mobile-kicker">Explore SHIE</span>
        {[
          ["Products", "/products"],
          ["Projects", "#projects"],
          ["Capabilities", "#capabilities"],
          ["About", "/about"],
          ["Contact", "/contact"]
        ].map(
          ([item, href], index) => (
            <a
              key={item}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item}
            </a>
          )
        )}
      </div>

      <section className="hero" aria-label="SHIE ceramic surface collection">
        <img
          className="hero-image"
          src="/images/hero-living-clean.png"
          alt="Contemporary living room finished with large format stone-look tile"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Surfaces for considered spaces</p>
          <h1>
            Material
            <br />
            shapes <em>space.</em>
          </h1>
          <p className="hero-copy">
            Ceramic tile and complete building material systems, curated in
            Foshan for ambitious spaces around the world.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#collections">
              Explore collections <ArrowRight size={17} />
            </a>
            <a className="text-link-light" href="/contact">
              Start a project <MoveUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <div className="hero-line">
            <i />
          </div>
          <span>04</span>
        </div>
        <a href="#intro" className="scroll-cue">
          Scroll to discover <ArrowDown size={16} />
        </a>
      </section>

      <section id="intro" className="intro section-pad">
        <div className="intro-label reveal">
          <span>01</span>
          <p>Designed around how<br />people really live.</p>
        </div>
        <div className="intro-statement reveal">
          <h2>
            From a single surface to a complete space, we make material
            selection <em>simpler, sharper,</em> and more dependable.
          </h2>
          <div className="intro-support">
            <p>
              One sourcing partner for distributors, designers and project
              teams—supported by flexible specifications, coordinated sampling
              and export experience.
            </p>
            <a href="#capabilities">
              <ArrowLink>How we work</ArrowLink>
            </a>
          </div>
        </div>
      </section>

      <section id="collections" className="collections section-pad">
        <div className="section-heading reveal">
          <div>
            <span className="section-number">02 / Collections</span>
            <h2>Explore by material</h2>
          </div>
          <p>
            A focused collection across the surfaces and fixtures that shape a
            space.
          </p>
        </div>
        <div className="collection-grid">
          {collections.map((item, index) => (
            <a
              href={`/products?category=${encodeURIComponent(item.name === "Bathroom" ? "Sanitary" : item.name)}`}
              className={`collection-card ${item.className} reveal`}
              key={item.name}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <img src={item.image} alt={item.name} />
              <div className="collection-overlay" />
              <span className="collection-count">0{index + 1}</span>
              <div className="collection-copy">
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="round-arrow">
                <ArrowRight size={19} />
              </span>
            </a>
          ))}
        </div>
        <a href="/products" className="all-collections reveal">
          <span>View all product categories</span>
          <ArrowRight size={18} />
        </a>
      </section>

      <section id="capabilities" className="capabilities">
        <div className="capability-visual reveal">
          <img
            src="/images/detail-floor.jpg"
            alt="Close detail of large format floor tile"
          />
          <div className="material-tag">
            <span>Featured finish</span>
            <strong>Mineral Grey / Soft Matt</strong>
          </div>
        </div>
        <div className="capability-content">
          <span className="section-number light">03 / One-stop sourcing</span>
          <h2 className="reveal">
            One partner.
            <br />
            <em>More possibility.</em>
          </h2>
          <p className="capability-lead reveal">
            Build a more coherent collection and move faster from selection to
            shipment with one experienced sourcing team.
          </p>
          <div className="capability-list">
            {[
              {
                icon: Sparkles,
                title: "Curated product direction",
                body: "Market-aware ranges selected for colour, finish and commercial fit."
              },
              {
                icon: PackageCheck,
                title: "Coordinated samples & loading",
                body: "Consolidated decisions and practical mixed-product shipment planning."
              },
              {
                icon: ShieldCheck,
                title: "Quality follow-through",
                body: "Specification checks and clear progress updates from order to dispatch."
              }
            ].map(({ icon: Icon, title, body }) => (
              <div className="capability-item reveal" key={title}>
                <Icon size={23} strokeWidth={1.4} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/contact" className="button button-accent reveal">
            Discuss your specification <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section id="projects" className="projects section-pad">
        <div className="section-heading reveal">
          <div>
            <span className="section-number">04 / Spaces</span>
            <h2>See materials in context</h2>
          </div>
          <p>
            Move beyond the product sheet. Explore how finish, proportion and
            scale work together.
          </p>
        </div>

        <div className="project-stage reveal">
          <div className="project-image-wrap">
            <img key={project.image} src={project.image} alt={project.title} />
            <span className="project-badge">{project.label} / 2026</span>
          </div>
          <div className="project-info">
            <span className="project-number">{project.number}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <small>{project.meta}</small>
            <a href="/about">
              <ArrowLink>View project details</ArrowLink>
            </a>
          </div>
        </div>

        <div className="project-tabs" role="tablist" aria-label="Project spaces">
          {projects.map((item, index) => (
            <button
              key={item.key}
              onClick={() => setActiveProject(index)}
              className={activeProject === index ? "is-active" : ""}
              role="tab"
              aria-selected={activeProject === index}
            >
              <span>{item.number}</span>
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section id="about" className="proof section-pad">
        <div className="proof-title reveal">
          <span className="section-number light">05 / Why Huangjia</span>
          <h2>Made to travel.<br /><em>Built to perform.</em></h2>
        </div>
        <div className="proof-stats">
          {[
            ["15+", "Years in building materials"],
            ["30+", "Export markets served"],
            ["7", "Coordinated product categories"],
            ["1:1", "Project support from enquiry to load"]
          ].map(([value, label]) => (
            <div className="stat reveal" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="proof-note reveal">
          <Check size={18} />
          <span>
            Foshan-based sourcing expertise · Custom specifications ·
            Consolidated export support
          </span>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-image">
          <img
            src="/images/team-client.jpg"
            alt="Huangjia team meeting with international clients"
          />
          <div className="contact-image-copy">
            <span>Let&apos;s build something considered.</span>
            <p>Tell us the material, quantity and market. We&apos;ll help shape the next step.</p>
          </div>
        </div>
        <div className="contact-form-wrap">
          <span className="section-number">Start a project</span>
          <h2>Request samples<br />or a quotation.</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const subject = encodeURIComponent(
                `Website enquiry from ${data.get("name") || "a new customer"}`
              );
              const body = encodeURIComponent(
                `Name / Company: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\nInterest: ${data.get("interest") || ""}\n\n${data.get("details") || ""}`
              );
              window.location.href = `mailto:ad2008fs@vip.126.com?subject=${subject}&body=${body}`;
            }}
          >
            <label>
              <span>Name / Company</span>
              <input name="name" required type="text" placeholder="Your name and company" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" required type="email" placeholder="name@company.com" />
            </label>
            <label>
              <span>I&apos;m interested in</span>
              <div className="select-wrap">
                <select name="interest" defaultValue="">
                  <option value="" disabled>Select a product category</option>
                  <option>Ceramic tile</option>
                  <option>Slab</option>
                  <option>Mosaic</option>
                  <option>Wall panel</option>
                  <option>Bathroom & sanitary</option>
                  <option>Mixed collection</option>
                </select>
                <ChevronDown size={17} />
              </div>
            </label>
            <label>
              <span>Project details</span>
              <textarea name="details" placeholder="Market, quantity, preferred size or finish..." />
            </label>
            <button className="button button-dark" type="submit">
              Send enquiry <ArrowRight size={17} />
            </button>
          </form>
          <div className="direct-contact">
            <a href="mailto:ad2008fs@vip.126.com">
              <Mail size={17} /> ad2008fs@vip.126.com
            </a>
            <a href="https://www.huangjia-tiles.com/" target="_blank">
              <Globe2 size={17} /> huangjia-tiles.com
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">SHIE</span>
          <p>
            Thoughtful surfaces and building material systems for global
            spaces.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="/products">Products</a>
            <a href="#projects">Projects</a>
            <a href="#capabilities">Capabilities</a>
          </div>
          <div>
            <span>Company</span>
            <a href="/about">About us</a>
            <a href="/contact">Contact</a>
            <a href="/cart">Selection</a>
          </div>
          <div>
            <span>Visit</span>
            <p>Foshan, Guangdong<br />China</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Foshan Huangjia Building Material Co., Ltd.</span>
          <span>International trade · OEM / ODM · Project supply</span>
        </div>
      </footer>

      <a className="floating-inquiry" href="/contact" aria-label="Start an enquiry">
        <MessageCircle size={19} />
        <span>Enquire</span>
      </a>
    </main>
  );
}
