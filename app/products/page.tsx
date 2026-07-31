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

export default function ProductsPage() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [visible, setVisible] = useState(18);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("category") || "");
    setQuery(params.get("q") || "");
  }, []);

  useEffect(() => setVisible(18), [category, query]);

  const results = useMemo(() => filterProducts(query, category), [query, category]);
  const heading = category || "All products";

  const chooseCategory = (value: string) => {
    setCategory(value);
    setMobileFilters(false);
    const url = value ? `/products?category=${encodeURIComponent(value)}` : "/products";
    window.history.replaceState({}, "", url);
  };

  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="original-page-title">
          <span>Home / Products</span>
          <h1>Products</h1>
          <p>{catalog.products.length} Items</p>
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
            {categoryGroups.map((group) => (
              <div className="filter-group" key={group.name}>
                <button
                  className={
                    normalizeCategory(category) === normalizeCategory(group.name)
                      ? "is-active"
                      : ""
                  }
                  onClick={() => chooseCategory(group.name)}
                >
                  <span>{group.name}</span>
                  <b>{categoryCount(group.name)}</b>
                </button>
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
            ))}
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
                <button className="sort-button">
                  Catalogue order <ChevronDown size={15} />
                </button>
              </div>
            </div>
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
