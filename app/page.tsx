import { ArrowRight, CreditCard, RefreshCw, Sparkles, Truck } from "lucide-react";
import { HomeCarousel } from "./components/HomeCarousel";
import { LegacyProductCard } from "./components/LegacyProductCard";
import { SiteShell } from "./components/SiteShell";
import { catalog } from "./lib/catalog";

const homeCategories = [
  { name: "CERAMIC TILE", image: "/images/tile-living.jpg" },
  { name: "SLAB", image: "/images/slab-white.jpg" },
  { name: "MOSAIC", image: "/images/mosaic-room.jpg" },
  { name: "SANITARY", image: "/images/bathroom.jpg" },
  { name: "WALL PANEL", image: "/images/wall-panel.jpg" }
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
        {originalProducts.map((product) => (
          <LegacyProductCard key={`${title}-${product.slug}`} product={product} />
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
          {[
            "/images/tile-living.jpg",
            "/images/slab-white.jpg",
            "/images/mosaic-room.jpg",
            "/images/bathroom.jpg",
            "/images/wall-panel.jpg",
            "/images/detail-floor.jpg",
            "/images/dining.jpg",
            "/images/bathroom-green.jpg"
          ].map((image, index) => (
            <div key={image}><img src={image} alt={`Huangjia collection ${index + 1}`} /></div>
          ))}
        </section>

        <section className="original-story-section">
          <div className="original-story-image">
            <img src="/images/team-client.jpg" alt="OUR STORY" />
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
                  src={index === 0 ? "/images/detail-floor.jpg" : "/images/team-client.jpg"}
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
              icon: Truck,
              title: "Fast Ground Shipping",
              text: "Inside the United States"
            },
            {
              icon: RefreshCw,
              title: "Free Exchanges",
              text: "15 day guarantee on all items"
            },
            {
              icon: CreditCard,
              title: "Safe Payments",
              text: "Trusted SSL Protection"
            },
            {
              icon: Sparkles,
              title: "Top Selection",
              text: "100% vegan and cruelty free"
            }
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={25} />
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
            {[
              "/images/tile-living.jpg",
              "/images/mosaic-room.jpg",
              "/images/dining.jpg",
              "/images/bathroom-green.jpg"
            ].map((image, index) => (
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
