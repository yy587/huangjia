import type { MetadataRoute } from "next";
import { catalog } from "./lib/catalog";

export const dynamic = "force-static";

const base = "https://yy587.github.io/huangjia";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/products", "/trade", "/news", "/contact", "/privacy"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}/`, changeFrequency: path === "/products" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...catalog.products.map((product) => ({ url: `${base}/product/${product.slug}/`, changeFrequency: "monthly" as const, priority: .6 })),
    ...catalog.news.map((article) => ({ url: `${base}/news/${article.slug}/`, changeFrequency: "yearly" as const, priority: .4 }))
  ];
}
