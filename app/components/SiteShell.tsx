"use client";

import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { categoryGroups, catalog } from "../lib/catalog";
import { useInquiry } from "./InquiryProvider";

export function SiteShell({
  children,
  theme = "light"
}: {
  children: React.ReactNode;
  theme?: "light" | "dark";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { count } = useInquiry();

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className={`catalog-site shell-${theme}`}>
      <div className="catalog-utility">
        <span>Foshan · China</span>
        <span>Tile & building material solutions for global projects</span>
        <span>
          <Globe2 size={13} /> EN
        </span>
      </div>
      <header className="catalog-header">
        <a href="/" className="catalog-brand" aria-label="SHIE home">
          <span>SHIE</span>
          <small>Huangjia<br />surfaces</small>
        </a>
        <nav className="catalog-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
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
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="catalog-actions">
          <a href="/search" aria-label="Search">
            <Search size={19} />
          </a>
          <a href="/cart" className="selection-link" aria-label={`Selection, ${count} items`}>
            <ShoppingBag size={19} />
            <span>Selection</span>
            <b>{count}</b>
          </a>
          <a href="/contact" className="catalog-header-cta">
            Request quote <ArrowRight size={15} />
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
          [`Selection (${count})`, "/cart"]
        ].map(([label, href], index) => (
          <a key={label} href={href}>
            <small>0{index + 1}</small>
            {label}
          </a>
        ))}
      </aside>

      {children}

      <footer className="catalog-footer">
        <div className="footer-lead">
          <span className="micro-label">Begin a conversation</span>
          <h2>Let’s build the right material package.</h2>
          <a href="/contact">
            Start a project <ArrowRight size={21} />
          </a>
        </div>
        <div className="footer-grid">
          <div>
            <a href="/" className="catalog-brand footer-brand">
              <span>SHIE</span>
              <small>Huangjia<br />surfaces</small>
            </a>
            <p>Surface and building material solutions, made in Foshan for projects worldwide.</p>
          </div>
          <div>
            <strong>Explore</strong>
            <a href="/products">Products</a>
            <a href="/about">About us</a>
            <a href="/news">News</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <strong>Product families</strong>
            {categoryGroups.slice(0, 5).map((group) => (
              <a
                key={group.name}
                href={`/products?category=${encodeURIComponent(group.name)}`}
              >
                {group.name}
              </a>
            ))}
          </div>
          <div>
            <strong>Contact</strong>
            <a href={`mailto:${catalog.contact.email}`}>
              <Mail size={14} /> {catalog.contact.email}
            </a>
            <a href={`tel:${catalog.contact.phone.replace(/[^\d+]/g, "")}`}>
              {catalog.contact.phone}
            </a>
            <p>Foshan, Guangdong, China</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Foshan Huangjia Building Material Co., Ltd.</span>
          <span>International trade · OEM / ODM · Project supply</span>
        </div>
      </footer>
    </div>
  );
}
