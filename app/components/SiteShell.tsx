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
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryGroups, catalog, filterProducts, primaryModel } from "../lib/catalog";
import { originalMedia } from "../lib/original-media";
import { sitePath } from "../lib/site-path";
import { useInquiry } from "./InquiryProvider";
import { LanguageToggle } from "./LanguageProvider";
import { QuickQuotePanel } from "./QuickQuotePanel";

export function SiteShell({
  children,
  theme = "light"
}: {
  children: React.ReactNode;
  theme?: "light" | "dark";
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerQuery, setHeaderQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const headerSearchRef = useRef<HTMLInputElement>(null);
  const megaTriggerRef = useRef<HTMLDivElement>(null);
  const { count } = useInquiry();
  const matchingHeaderResults = useMemo(
    () => headerQuery.trim() ? filterProducts(headerQuery) : [],
    [headerQuery]
  );
  const headerResults = matchingHeaderResults.slice(0, 6);
  const isCurrentPath = (path: string) => path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

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
      ".original-section-heading,.original-category-grid>a,.legacy-product-card,.original-story-image,.original-story-copy,.original-service-strip article,.original-social-grid>div,.original-update-grid>a,.home-contact-cta,.news-card,.product-card,.about-reason-card"
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

  useEffect(() => {
    const closeProductsWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
      }
    };
    const closeProductsOutside = (event: PointerEvent) => {
      if (!megaTriggerRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    window.addEventListener("keydown", closeProductsWithKeyboard);
    window.addEventListener("pointerdown", closeProductsOutside);
    return () => {
      window.removeEventListener("keydown", closeProductsWithKeyboard);
      window.removeEventListener("pointerdown", closeProductsOutside);
    };
  }, []);

  return (
    <div className={`catalog-site shell-${theme}`}>
      <div className="catalog-utility">
        <span>International building material supply · Foshan, China</span>
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
                <small>{matchingHeaderResults.length} found</small>
              </div>
              {headerResults.length ? headerResults.map((product) => (
                <a href={sitePath(`/product/${product.slug}`)} key={product.slug}>
                  <img src={sitePath(product.images[0] || "/images/bathroom.jpg")} alt="" />
                  <span>
                    <small>{product.category}</small>
                    <strong>{primaryModel(product.name)}</strong>
                  </span>
                  <ArrowRight size={15} />
                </a>
              )) : <div className="catalog-search-empty">
                <p>No matching products</p>
                <a href={sitePath("/products")}>Browse all products</a>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => setQuoteOpen(true)}>Ask our team</button>
              </div>}
              {headerResults.length > 0 && <a className="catalog-search-all" href={sitePath(`/products?q=${encodeURIComponent(headerQuery.trim())}`)}>
                View all {matchingHeaderResults.length} results <ArrowRight size={15} />
              </a>}
            </div>
          )}
        </div>
        <a href={sitePath("/")} className="catalog-brand" aria-label="Huangjia home">
          <img src={originalMedia.logo} alt="Foshan Huangjia Building Material Co., Ltd." />
        </a>
        <div className="catalog-actions">
          <a href={sitePath("/cart")} className="selection-link" aria-label={`Quote list, ${count} items`}>
            <ShoppingBag size={20} />
            <span>Quote List</span>
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
          <a className={isCurrentPath("/") ? "is-current" : ""} aria-current={isCurrentPath("/") ? "page" : undefined} href={sitePath("/")}>Home</a>
          <div
            ref={megaTriggerRef}
            className="mega-trigger"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onFocusCapture={() => setProductsOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setProductsOpen(false);
            }}
          >
            <a
              className={isCurrentPath("/products") || isCurrentPath("/product") ? "is-current" : ""}
              href={sitePath("/products")}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={(event) => {
                if (!productsOpen) {
                  event.preventDefault();
                  setProductsOpen(true);
                }
              }}
            >
              Products <ChevronDown size={14} />
            </a>
            <div className={`mega-menu ${productsOpen ? "is-open" : ""}`}>
              <div className="mega-intro">
                <span className="micro-label">Complete catalogue</span>
                <h3>Materials for the whole space.</h3>
                <p>Browse Huangjia's complete product catalogue and planned collections.</p>
                <a className="line-link" href={sitePath("/products")}>
                  View all products <ArrowRight size={15} />
                </a>
              </div>
              <div className="mega-categories">
                {categoryGroups.map((group) => (
                  <div key={group.name}>
                    <a
                      className="mega-title"
                      href={sitePath(`/products?category=${encodeURIComponent(group.name)}`)}
                    >
                      {group.name}
                    </a>
                    {group.children.map((child) => (
                      <a
                        key={child}
                        href={sitePath(`/products?category=${encodeURIComponent(child)}`)}
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a className={isCurrentPath("/about") ? "is-current" : ""} aria-current={isCurrentPath("/about") ? "page" : undefined} href={sitePath("/about")}>About Us</a>
          <a className={isCurrentPath("/contact") ? "is-current" : ""} aria-current={isCurrentPath("/contact") ? "page" : undefined} href={sitePath("/contact")}>Contact Us</a>
      </nav>
      <span className="catalog-scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      <aside className={`catalog-mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <X size={26} />
        </button>
        <span className="micro-label">Explore Huangjia</span>
        {[["Home", sitePath("/")]].map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
        <button
          className="mobile-products-toggle"
          type="button"
          aria-expanded={mobileProductsOpen}
          onClick={() => setMobileProductsOpen((value) => !value)}
        >
          <span>Products</span><ChevronDown size={18} />
        </button>
        <div className={`mobile-product-groups${mobileProductsOpen ? " is-open" : ""}`}>
          <a href={sitePath("/products")}>View all products</a>
          {categoryGroups.map((group) => (
            <a key={group.name} href={sitePath(`/products?category=${encodeURIComponent(group.name)}`)}>{group.name}</a>
          ))}
        </div>
        {[
          ["About", sitePath("/about")],
          ["Contact", sitePath("/contact")],
          [`Quote List (${count})`, sitePath("/cart")]
        ].map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </aside>

      {children}

      <QuickQuotePanel open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      <footer className="catalog-footer original-footer">
        <div className="original-footer-main">
          <a href={sitePath("/")} className="catalog-brand footer-brand">
            <img src={originalMedia.logo} alt="Foshan Huangjia Building Material Co., Ltd." />
          </a>
          <nav>
            <a href={sitePath("/")}>Home</a>
            <a href={sitePath("/about")}>About Us</a>
            <a href={sitePath("/products")}>Products</a>
            <a href={sitePath("/news")}>News</a>
            <a href={sitePath("/contact")}>Contact Us</a>
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
          <span>© {new Date().getFullYear()} Foshan Huangjia Building Material Co., Ltd. All rights reserved. · <a href={sitePath("/privacy")}>Privacy</a></span>
          <a href={sitePath("/cart")}>Quote List ({count})</a>
        </div>
      </footer>
    </div>
  );
}
