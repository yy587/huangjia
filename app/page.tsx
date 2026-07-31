import { ArrowRight } from "lucide-react";
import { HomeCarousel } from "./components/HomeCarousel";
import { LegacyProductCard } from "./components/LegacyProductCard";
import { SiteShell } from "./components/SiteShell";
import { catalog } from "./lib/catalog";
import { originalMedia } from "./lib/original-media";

const homeCategories = [
  { name: "CERAMIC TILE", image: originalMedia.categories[0] },
  { name: "SLAB", image: originalMedia.categories[1] },
  { name: "MOSAIC", image: originalMedia.categories[2] },
  { name: "SANITARY", image: originalMedia.categories[3] },
  { name: "WALL PANEL", image: originalMedia.categories[4] }
];

const originalProducts = [...catalog.products].reverse().slice(0, 8);

function ProductSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="original-product-section">
      <div className="original-section-heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="legacy-product-grid">
        {originalProducts.map((product, index) => (
          <LegacyProductCard
            key={`${title}-${product.slug}`}
            product={product}
            image={originalMedia.homeProducts[index]}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <main className="catalog-main original-structure-home">
        <HomeCarousel />

        <section className="original-category-section">
          <div className="original-section-heading">
            <h2>CERAMIC TILE</h2>
            <p>CERAMIC TILE Products</p>
          </div>
          <div className="original-category-grid">
            {homeCategories.map((category) => (
              <a
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
              >
                <img src={category.image} alt={category.name} />
                <span />
                <h3>{category.name}</h3>
                <i><ArrowRight size={18} /></i>
              </a>
            ))}
          </div>
        </section>

        <ProductSection title="TRENDING PRODUCTS" subtitle="Our Bestsellers" />
        <ProductSection
          title="FEATURED PRODUCTS"
          subtitle="Popular Trending Lash Beauty Artist Products"
        />
        <ProductSection
          title="NEW ARRIVAL PRODUCTS"
          subtitle="Find More popular beauty eyelash products"
        />

        <section className="original-logo-strip" aria-label="Huangjia collections">
          {originalMedia.collectionStrip.map((image, index) => (
            <div key={image}><img src={image} alt={`Huangjia collection ${index + 1}`} /></div>
          ))}
        </section>

        <section className="original-story-section">
          <div className="original-story-image">
            <img src={originalMedia.story} alt="OUR STORY" />
          </div>
          <div className="original-story-copy">
            <div className="original-section-heading align-left">
              <h2>OUR STORY</h2>
              <p>a little bit about us</p>
            </div>
            <p>
              HUANGJIA was established in Foshan in 2020. The brand design always
              maintains the noble and elegant style, exuding fashion charm,
              self-confidence and vitality. In the field of ceramic tiles and slabs
              and mosaic and sanitary ware and wall tiles and roof tiles and tile
              accessories, HUANGJIA is the perfect presentation of elegance and luxury.
            </p>
            <p>
              We have many years of experience on building material, and we can provide
              many solutions and products on building material. We sincerely hope that
              every customer who enters our website can buy their favourite products,
              immediately enter the official HUANGJIA online boutique and enjoy luxury
              shopping.
            </p>
            <a href="/about">read more <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="original-updates-section">
          <div className="original-section-heading">
            <h2>RECENT UPDATES</h2>
            <p>If it&apos;s worth knowing about, you&apos;ll find it here.</p>
          </div>
          <div className="original-update-grid">
            {catalog.news.map((article, index) => (
              <a href={`/news/${article.slug}`} key={article.slug}>
                <img
                  src={originalMedia.news[index]}
                  alt={article.title}
                />
                <small>{article.date}</small>
                <h3>{article.title}</h3>
                <p>{article.title}</p>
                <b>read more <ArrowRight size={14} /></b>
              </a>
            ))}
          </div>
        </section>

        <section className="original-service-strip">
          {[
            {
              icon: originalMedia.services[0],
              title: "Fast Ground Shipping",
              text: "Inside the United States"
            },
            {
              icon: originalMedia.services[1],
              title: "Free Exchanges",
              text: "15 day guarantee on all items"
            },
            {
              icon: originalMedia.services[2],
              title: "Safe Payments",
              text: "Trusted SSL Protection"
            },
            {
              icon: originalMedia.services[3],
              title: "Top Selection",
              text: "100% vegan and cruelty free"
            }
          ].map(({ icon, title, text }) => (
            <article key={title}>
              <img src={icon} alt="" />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </section>

        <section className="original-social-section">
          <div className="original-section-heading">
            <h2>#HUANGJIA</h2>
            <p>Join us &amp; Shop Instagram</p>
          </div>
          <div className="original-social-grid">
            {originalMedia.social.map((image, index) => (
              <a href="/products" key={image} aria-label={`Huangjia gallery ${index + 1}`}>
                <img src={image} alt="" />
              </a>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
