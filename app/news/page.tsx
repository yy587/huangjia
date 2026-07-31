import { ArrowRight } from "lucide-react";
import { SiteShell } from "../components/SiteShell";
import { catalog } from "../lib/catalog";

export default function NewsPage() {
  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="page-hero news-hero">
          <div>
            <span className="micro-label">News & journal</span>
            <h1>Updates from<br /><em>Huangjia.</em></h1>
          </div>
          <p>Company notes, product information and practical updates for our customers.</p>
        </section>
        <section className="news-list">
          {catalog.news.map((article, index) => (
            <article key={article.slug} className="news-card">
              <a href={`/news/${article.slug}`} className="news-image">
                <img
                  src={index === 0 ? "/images/detail-floor.jpg" : "/images/team-client.jpg"}
                  alt={article.title}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
              <div>
                <span className="micro-label">{index === 0 ? "Notice" : "Blog"} · {article.date}</span>
                <h2><a href={`/news/${article.slug}`}>{article.title}</a></h2>
                <p>{article.content.slice(0, 190)}{article.content.length > 190 ? "…" : ""}</p>
                <a className="line-link" href={`/news/${article.slug}`}>
                  Read article <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
