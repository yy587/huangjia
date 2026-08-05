"use client";

import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { SiteShell } from "../components/SiteShell";
import { catalog, filterProducts } from "../lib/catalog";
import { sitePath } from "../lib/site-path";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    inputRef.current?.focus();
  }, []);

  const products = useMemo(() => (query.trim() ? filterProducts(query) : []), [query]);
  const articles = useMemo(
    () =>
      query.trim()
        ? catalog.news.filter((article) =>
            `${article.title} ${article.content}`.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [query]
  );

  return (
    <SiteShell>
      <main className="catalog-main search-page">
        <section className="search-heading">
          <span className="micro-label">Search the Huangjia catalogue</span>
          <h1>What are you looking for?</h1>
          <label>
            <Search size={24} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “faucet”, “HJ-JH”, or “rustic tile”"
            />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={20} /></button>}
          </label>
        </section>
        {query.trim() ? (
          <section className="search-results">
            <div className="section-heading-row">
              <div>
                <span className="micro-label">Search results</span>
                <h2>{products.length + articles.length} matches for “{query}”</h2>
              </div>
            </div>
            {products.length > 0 && (
              <div className="product-grid">
                {products.slice(0, 12).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
            {articles.map((article) => (
          <a className="search-article" key={article.slug} href={sitePath(`/news/${article.slug}`)}>
                <span>News</span>
                <h3>{article.title}</h3>
                <ArrowRight size={18} />
              </a>
            ))}
            {products.length + articles.length === 0 && (
              <div className="empty-results">
                <span>Nothing found</span>
                <h3>Try a product family or model number.</h3>
                <p>Popular searches include sanitary, shower head, rustic tile and HJ-JH.</p>
        <a href={sitePath("/products")}>Browse the complete catalogue</a>
              </div>
            )}
          </section>
        ) : (
          <section className="search-suggestions">
            <span className="micro-label">Popular searches</span>
            {["Rustic Tile", "Toilet Bowl", "Shower Head", "Faucet", "Hardware Accessories"].map((term) => (
              <button key={term} onClick={() => setQuery(term)}>
                {term} <ArrowRight size={17} />
              </button>
            ))}
          </section>
        )}
      </main>
    </SiteShell>
  );
}
