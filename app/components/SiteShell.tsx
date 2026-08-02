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
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryGroups, catalog, filterProducts, primaryModel } from "../lib/catalog";
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
  const [headerQuery, setHeaderQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const headerSearchRef = useRef<HTMLInputElement>(null);
  const { count } = useInquiry();
  const headerResults = useMemo(
    () => headerQuery.trim() ? filterProducts(headerQuery).slice(0, 6) : [],
    [headerQuery]
  );
  const phoneDigits = catalog.contact.phone.replace(/[^\d]/g, "");
  const contactLinks = [
    { label: "WhatsApp", icon: originalMedia.footerIcons[0], href: `https://wa.me/${phoneDigits}`, className: "rail-whatsapp" },
    { label: "Skype", icon: originalMedia.footerIcons[1], href: "skype:myskype?chat", className: "rail-skype" },
    { label: "WeChat", icon: originalMedia.footerIcons[2], href: "/contact", className: "rail-wechat" },
    { label: "Telephone", icon: originalMedia.footerIcons[3], href: `tel:${catalog.contact.phone.replace(/[^\d+]/g, "")}`, className: "rail-phone" },
    { label: "YouTube", icon: originalMedia.footerIcons[4], href: "https://www.youtube.com/", className: "rail-youtube" },
    { label: "Instagram", icon: originalMedia.footerIcons[5], href: "https://www.instagram.com/", className: "rail-instagram" },
    { label: "Pinterest", icon: originalMedia.footerIcons[6], href: "https://www.pinterest.com/", className: "rail-pinterest" },
    { label: "LinkedIn", icon: originalMedia.footerIcons[7], href: "https://www.linkedin.com/", className: "rail-linkedin" },
    { label: "Facebook", icon: originalMedia.footerIcons[8], href: "https://www.facebook.com/", className: "rail-facebook" },
    { label: "X", icon: originalMedia.footerIcons[9], href: "https://www.twitter.com/", className: "rail-x" },
    { label: "Email", icon: originalMedia.footerIcons[10], href: `mailto:${catalog.contact.email}`, className: "rail-email" }
  ];

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
      ".original-section-heading,.original-category-grid>a,.legacy-product-card,.original-story-copy,.original-update-grid>a,.news-card,.product-card,.about-reason-card"
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
        <span>Official material store · Browse, select and request a quote</span>
        <LanguageToggle compact />
      </div>
      <header className={`catalog-header ${scrolled ? "is-scrolled" : ""}`}>
        <div
          className={`catalog-inline-search ${searchFocused ? "is-focused" : ""} ${mobileSearchOpen ? "is-mobile-open" : ""}`}
          onFocus={() => setSearchFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setSearchFocused(false);
              setMobileSearchOpen(false);
            }
          }}
        >
          <Search className="catalog-search-icon" size={18} />
          <button
            type="button"
            className="catalog-inline-search-toggle"
            aria-label="Search products"
            onClick={() => {
              const next = !mobileSearchOpen;
              setMobileSearchOpen(next);
              if (next) window.requestAnimationFrame(() => headerSearchRef.current?.focus());
            }}
          >
            <Search size={19} />
          </button>
          <input
            ref={headerSearchRef}
            value={headerQuery}
            onChange={(event) => setHeaderQuery(event.target.value)}
            placeholder="Search products or model"
            aria-label="Search products or model"
          />
          {headerQuery && (
            <button
              type="button"
              className="catalog-search-clear"
              aria-label="Clear search"
              onClick={() => {
                setHeaderQuery("");
                headerSearchRef.current?.focus();
              }}
            >
              <X size={15} />
            </button>
          )}
          {searchFocused && headerQuery.trim() && (
            <div className="catalog-inline-results" aria-live="polite">
              <div className="catalog-inline-results-head">
                <span>Search results</span>
                <small>{headerResults.length} shown</small>
              </div>
              {headerResults.length ? headerResults.map((product) => (
                <a href={`/product/${product.slug}`} key={product.slug}>
                  <img src={product.images[0]} alt="" />
                  <span>
                    <small>{product.category}</small>
                    <strong>{primaryModel(product.name)}</strong>
                  </span>
                  <ArrowRight size={15} />
                </a>
              )) : (
                <p>No matching products</p>
              )}
            </div>
          )}
        </div>
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

      <aside className="social-contact-rail" aria-label="Contact and social links">
        {contactLinks.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <a
              key={item.label}
              className={item.className}
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={item.label}
            >
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </aside>

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
            {contactLinks.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={item.label}
                >
                  <img src={item.icon} alt="" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
