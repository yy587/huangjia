"use client";

import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { SiteShell } from "../components/SiteShell";
import {
  categoryCount,
  categoryGroups,
  catalog,
  filterProducts,
  normalizeCategory
} from "../lib/catalog";
import { originalMedia } from "../lib/original-media";
import { sitePath } from "../lib/site-path";

export default function ProductsPage() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [visible, setVisible] = useState(18);
  const [sort, setSort] = useState("catalogue");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([categoryGroups[0]?.name || ""]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("category") || "");
    setQuery(params.get("q") || "");
  }, []);

  useEffect(() => setVisible(18), [category, query]);

  useEffect(() => {
    if (!mobileFilters) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFilters(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [mobileFilters]);

  const results = useMemo(() => {
    const products = [...filterProducts(query, category)];
    if (sort === "model-asc") products.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "model-desc") products.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "category") products.sort((a, b) => a.category.localeCompare(b.category));
    return products;
  }, [query, category, sort]);
  const heading = category || "All products";

  useEffect(() => {
    const parent = categoryGroups.find((group) =>
      normalizeCategory(group.name) === normalizeCategory(category) ||
      group.children.some((child) => normalizeCategory(child) === normalizeCategory(category))
    );
    if (parent) setExpandedGroups((current) => current.includes(parent.name) ? current : [...current, parent.name]);
  }, [category]);

  const chooseCategory = (value: string) => {
    setCategory(value);
    const url = value ? `${sitePath("/products")}?category=${encodeURIComponent(value)}` : sitePath("/products");
    window.history.replaceState({}, "", url);
  };

  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="original-product-banner">
          <img src={originalMedia.productBanner} alt="Products" />
          <div className="original-page-title is-on-media">
            <span>Home / Products</span>
            <h1>Products</h1>
            <p>{catalog.products.length} Items</p>
          </div>
        </section>

        <section className="product-browser">
          <aside className={`product-filters ${mobileFilters ? "is-open" : ""}`}>
            <div className="filter-heading">
              <span>Product families</span>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <button
              className={!category ? "is-active" : ""}
              onClick={() => chooseCategory("")}
            >
              <span>All products</span>
              <b>{catalog.products.length}</b>
            </button>
            <div className="popular-filter-set">
              <span>Popular</span>
              {["CERAMIC TILE", "SANITARY", "WALL PANEL"].map((item) => <button key={item} onClick={() => chooseCategory(item)}>{item}</button>)}
            </div>
            {categoryGroups.map((group) => (
              <div className="filter-group" key={group.name}>
                <div className="filter-group-heading">
                  <button className={
                    normalizeCategory(category) === normalizeCategory(group.name)
                      ? "is-active"
                      : ""
                  } onClick={() => chooseCategory(group.name)}>
                    <span>{group.name}</span><b>{categoryCount(group.name)}</b>
                  </button>
                  <button className="filter-expand" type="button" aria-label={`Toggle ${group.name}`} aria-expanded={expandedGroups.includes(group.name)} onClick={() => setExpandedGroups((current) => current.includes(group.name) ? current.filter((name) => name !== group.name) : [...current, group.name])}>
                    <ChevronDown size={16} />
                  </button>
                </div>
                <div className={`filter-children${expandedGroups.includes(group.name) ? " is-open" : ""}`}>
                  {group.children.map((child) => (
                  <button
                    key={child}
                    className={
                      normalizeCategory(category) === normalizeCategory(child)
                        ? "is-active is-child"
                        : "is-child"
                    }
                    onClick={() => chooseCategory(child)}
                  >
                    <span>{child}</span>
                    <b>{categoryCount(child)}</b>
                  </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="mobile-filter-results" type="button" onClick={() => setMobileFilters(false)}>View {results.length} products</button>
          </aside>

          <div className="product-results">
            <div className="results-toolbar">
              <div>
                <span className="micro-label">Selected collection</span>
                <h2>{heading}</h2>
                <p>{results.length} product groups</p>
              </div>
              <div className="results-actions">
                <label>
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search model or product"
                  />
                </label>
                <button className="mobile-filter-button" onClick={() => setMobileFilters(true)}>
                  <SlidersHorizontal size={17} /> Filters
                </button>
                <label className="sort-select" aria-label="Sort products">
                  <select value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="catalogue">Catalogue order</option>
                    <option value="model-asc">Model A–Z</option>
                    <option value="model-desc">Model Z–A</option>
                    <option value="category">Product category</option>
                  </select>
                </label>
              </div>
            </div>
            {(category || query) && (
              <div className="active-product-filters">
                <span>Active filters</span>
                {category && <button onClick={() => chooseCategory("")}>{category}<X size={13} /></button>}
                {query && <button onClick={() => setQuery("")}>“{query}”<X size={13} /></button>}
                <button className="clear-product-filters" onClick={() => { chooseCategory(""); setQuery(""); }}>Clear all</button>
              </div>
            )}
            {results.length ? (
              <>
                <div className="product-grid">
                  {results.slice(0, visible).map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
                {visible < results.length && (
                  <button className="load-more" onClick={() => setVisible((value) => value + 18)}>
                    Load more products
                  </button>
                )}
              </>
            ) : (
              <div className="empty-results">
                <span>0 results</span>
                <h3>This collection is ready for content.</h3>
                <p>
                  The category exists on the current Huangjia website, but no individual
                  product records are published in its sitemap yet.
                </p>
                <button onClick={() => chooseCategory("")}>Browse all available products</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
