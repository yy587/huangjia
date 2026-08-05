import { ArrowRight } from "lucide-react";
import { SiteShell } from "../components/SiteShell";
import { catalog } from "../lib/catalog";
import { originalMedia } from "../lib/original-media";
import { sitePath } from "../lib/site-path";

export default function NewsPage() {
  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="original-page-title">
          <span>Home / News</span>
          <h1>News</h1>
          <p>Blog · Notice</p>
        </section>
        <section className="news-list">
          {catalog.news.map((article, index) => (
            <article key={article.slug} className="news-card">
              <a href={sitePath(`/news/${article.slug}`)} className="news-image">
                <img
                  src={originalMedia.news[index]}
                  alt={article.title}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
              <div>
                <span className="micro-label">{index === 0 ? "Notice" : "Blog"} · {article.date}</span>
                <h2><a href={sitePath(`/news/${article.slug}`)}>{article.title}</a></h2>
                <p>{article.content.slice(0, 190)}{article.content.length > 190 ? "…" : ""}</p>
                <a className="line-link" href={sitePath(`/news/${article.slug}`)}>
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
