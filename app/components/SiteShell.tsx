"use client";

import {
  ArrowRight,
  ChevronDown,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { categoryGroups, catalog } from "../lib/catalog";
import { originalMedia } from "../lib/original-media";
import { useInquiry } from "./InquiryProvider";
import { LanguageToggle } from "./LanguageProvider";

export function SiteShell({
  children,
  theme = "light"
}: {
  children: React.ReactNode;
  theme?: "light" | "dark";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { count } = useInquiry();

  useEffect(() => {
    setMobileOpen(false);
    const updateScroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setScrollProgress(distance > 0 ? Math.min(window.scrollY / distance, 1) : 0);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
      { threshold: 0.08, rootMargin: "0px 0px -35px" }
    );
    document.querySelectorAll(
      ".original-section-heading,.original-category-grid>a,.legacy-product-card,.original-story-copy,.original-update-grid>a,.news-card,.product-card"
    ).forEach((element) => {
      element.classList.add("ui-reveal");
      observer.observe(element);
    });
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`catalog-site shell-${theme}`}>
      <div className="catalog-utility">
        <span>Foshan · China</span>
        <span>Tile & building material solutions for global projects</span>
        <LanguageToggle compact />
      </div>
      <header className={`catalog-header ${scrolled ? "is-scrolled" : ""}`}>
        <a href="/search" className="catalog-leading-search">
          <Search size={19} /> <span>Search</span>
        </a>
        <a href="/" className="catalog-brand" aria-label="SHIE home">
          <img src={originalMedia.logo} alt="Foshan Huangjia Building Material Co., Ltd." />
        </a>
        <div className="catalog-actions">
          <a href="/cart" className="selection-link" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={20} />
            <span>Cart</span>
            <b>{count}</b>
          </a>
          <button
            className="catalog-mobile-toggle"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <nav className={`catalog-nav catalog-nav-row ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <div
            className="mega-trigger"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <a href="/products">
              Products <ChevronDown size={14} />
            </a>
            <div className={`mega-menu ${productsOpen ? "is-open" : ""}`}>
              <div className="mega-intro">
                <span className="micro-label">Complete catalogue</span>
                <h3>Materials for the whole space.</h3>
                <p>Explore 7 product families and the full Huangjia collection.</p>
                <a className="line-link" href="/products">
                  View all products <ArrowRight size={15} />
                </a>
              </div>
              <div className="mega-categories">
                {categoryGroups.map((group) => (
                  <div key={group.name}>
                    <a
                      className="mega-title"
                      href={`/products?category=${encodeURIComponent(group.name)}`}
                    >
                      {group.name}
                    </a>
                    {group.children.slice(0, 6).map((child) => (
                      <a
                        key={child}
                        href={`/products?category=${encodeURIComponent(child)}`}
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a href="/news">News <ChevronDown size={14} /></a>
          <a href="/contact">Contact Us</a>
      </nav>
      <span className="catalog-scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      <aside className={`catalog-mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <X size={26} />
        </button>
        <span className="micro-label">Explore Huangjia</span>
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Products", "/products"],
          ["News", "/news"],
          ["Contact", "/contact"],
          [`Cart (${count})`, "/cart"]
        ].map(([label, href], index) => (
          <a key={label} href={href}>
            <small>0{index + 1}</small>
            {label}
          </a>
        ))}
      </aside>

      {children}

      <a className="floating-enquiry" href="/contact">
        <Mail size={17} /> <span>Get a quote</span><ArrowRight size={16} />
      </a>

      <footer className="catalog-footer original-footer">
        <div className="original-footer-main">
          <a href="/" className="catalog-brand footer-brand">
            <img src={originalMedia.logo} alt="Foshan Huangjia Building Material Co., Ltd." />
          </a>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/products">Products</a>
            <a href="/news">News</a>
            <a href="/contact">Contact Us</a>
          </nav>
          <div>
            <a href={`mailto:${catalog.contact.email}`}>
              <Mail size={14} /> {catalog.contact.email}
            </a>
            <a href={`tel:${catalog.contact.phone.replace(/[^\d+]/g, "")}`}>
              {catalog.contact.phone}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Foshan Huangjia Building Material Co., Ltd. All rights reserved.</span>
          <div className="original-footer-icons" aria-label="Huangjia contact and social channels">
            {originalMedia.footerIcons.map((icon, index) => (
              <img key={icon} src={icon} alt={`Huangjia channel ${index + 1}`} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
