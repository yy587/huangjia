import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { catalog } from "../../lib/catalog";

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = catalog.news.find((item) => item.slug === slug);
  if (!article) notFound();
  const paragraphs = article.content.split("\n").filter(Boolean);

  return (
    <SiteShell>
      <main className="catalog-main">
        <article className="article-page">
          <a href="/news" className="back-link"><ArrowLeft size={15} /> Back to news</a>
          <span className="micro-label">{article.date}</span>
          <h1>{article.title}</h1>
          <div className="article-image">
            <img
              src={slug === "show-11-8" ? "/images/detail-floor.jpg" : "/images/team-client.jpg"}
              alt={article.title}
            />
          </div>
          <div className="article-content">
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </article>
      </main>
    </SiteShell>
  );
}

export function generateStaticParams() {
  return catalog.news.map((article) => ({ slug: article.slug }));
}
