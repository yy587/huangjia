import { ArrowRight } from "lucide-react";
import { HomeCarousel } from "./components/HomeCarousel";
import { HomeProductSection } from "./components/HomeProductSection";
import { SiteShell } from "./components/SiteShell";
import { catalog } from "./lib/catalog";
import { originalMedia } from "./lib/original-media";
import { sitePath } from "./lib/site-path";

const homeCategories = [
  { name: "CERAMIC TILE", image: originalMedia.categories[0] },
  { name: "POLISHED TILE", image: originalMedia.categories[1] },
  { name: "RUSTIC TILE", image: originalMedia.categories[2] },
  { name: "EXTERIOR WALL BRICK", image: originalMedia.categories[4] },
  { name: "SANITARY", image: originalMedia.categories[3] }
];

const importedProducts = catalog.products.filter((product) =>
  product.slug.startsWith("catalog-2026-08-")
);
const originalProducts = (
  importedProducts.length ? importedProducts : [...catalog.products].reverse()
).slice(0, 8);

function ProductSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <HomeProductSection
      title={title}
      subtitle={subtitle}
      products={originalProducts}
      images={[]}
    />
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <main className="catalog-main original-structure-home">
        <HomeCarousel />

        <section className="original-category-section">
          <div className="original-section-heading">
            <h2>PRODUCT CATEGORIES</h2>
            <p>Shop by material</p>
          </div>
          <div className="original-category-grid">
            {homeCategories.map((category) => (
              <a
                key={category.name}
              href={sitePath(`/products?category=${encodeURIComponent(category.name)}`)}
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

        <section className="original-logo-strip" aria-label="Huangjia certifications">
          {originalMedia.collectionStrip.map((image, index) => (
            <div key={image}>
              <img src={image} alt={`Huangjia certification ${index + 1}`} />
            </div>
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
          <a href={sitePath("/about")}>read more <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="home-service-section">
          <div className="original-section-heading">
            <h2>WHY CHOOSE HUANGJIA</h2>
            <p>A clear path from selection to confirmed order</p>
          </div>
          <div className="original-service-strip">
            {[
              {
                icon: originalMedia.services[0],
                title: "Choose materials",
                text: "Browse categories and product details"
              },
              {
                icon: originalMedia.services[1],
                title: "Add to quote",
                text: "Save the models and quantities you need"
              },
              {
                icon: originalMedia.services[2],
                title: "Request quotation",
                text: "Send one complete material list to sales"
              },
              {
                icon: originalMedia.services[3],
                title: "Confirm order",
                text: "Confirm price, specifications and shipping"
              }
            ].map(({ icon, title, text }) => (
              <article key={title}>
                <img src={icon} alt="" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="original-social-section">
          <div className="original-section-heading">
            <h2>#HUANGJIA</h2>
            <p>Join us &amp; Shop Instagram</p>
          </div>
          <div className="original-social-grid">
            {originalMedia.social.map((image, index) => (
              <div key={image} aria-label={`Huangjia gallery ${index + 1}`}>
                <img src={image} alt={`Huangjia gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="home-contact-cta">
          <div>
            <span>Start a project</span>
            <h2>Browse, select and request a quote.</h2>
            <p>Browse products, build one quote list, then send it to our sales team.</p>
          </div>
          <aside>
          <a href={sitePath("/contact")}>Contact Us <ArrowRight size={17} /></a>
          <a href={sitePath("/cart")}>View quote list <ArrowRight size={17} /></a>
            <small>Direct contact</small>
            <a href={`tel:${catalog.contact.phone.replace(/[^\d+]/g, "")}`}>{catalog.contact.phone}</a>
            <a href={`mailto:${catalog.contact.email}`}>{catalog.contact.email}</a>
          </aside>
        </section>
      </main>
    </SiteShell>
  );
}
