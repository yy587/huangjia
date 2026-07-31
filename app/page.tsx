import {
  ArrowRight,
  Check,
  ClipboardList,
  PackageCheck,
  Search,
  Send,
  Truck
} from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { SiteShell } from "./components/SiteShell";
import { catalog } from "./lib/catalog";

const mainCategories = [
  {
    name: "Ceramic Tile",
    description: "Polished, rustic, glazed and exterior wall tile",
    image: "/images/tile-living.jpg"
  },
  {
    name: "Slab",
    description: "Large-format architectural surfaces",
    image: "/images/slab-white.jpg"
  },
  {
    name: "Mosaic",
    description: "Stone, ceramic and glass mosaic",
    image: "/images/mosaic-room.jpg"
  },
  {
    name: "Sanitary",
    description: "Sanitaryware, faucets, showers and fittings",
    image: "/images/bathroom.jpg"
  },
  {
    name: "Wall Panel",
    description: "Wood, PET marble and water-ripple panels",
    image: "/images/wall-panel.jpg"
  }
];

const latestProducts = [...catalog.products].reverse().slice(0, 8);
const featuredProducts = catalog.products
  .filter((product) =>
    ["RUSTIC TILE", "TOILET BOWL", "FAUCET", "SHOWER HEAD"].includes(product.category)
  )
  .slice(0, 4);

export default function HomePage() {
  return (
    <SiteShell>
      <main className="catalog-main clear-home">
        <section className="clear-hero">
          <div className="clear-hero-copy">
            <span className="micro-label">Foshan building material supplier</span>
            <h1>
              Tile, sanitaryware
              <br />
              <em>&amp; complete materials.</em>
            </h1>
            <p>
              Browse Huangjia’s product catalogue, add the models you need to your
              selection, and send one clear enquiry to our Foshan team.
            </p>
            <div className="clear-hero-actions">
              <a href="/products">
                Browse all products <ArrowRight size={17} />
              </a>
              <a href="/contact">
                Contact our sales team
              </a>
            </div>
            <form className="home-product-search" action="/search">
              <Search size={19} />
              <input
                name="q"
                aria-label="Search products"
                placeholder="Search by product, category or model number"
              />
              <button type="submit">
                Search catalogue <ArrowRight size={16} />
              </button>
            </form>
          </div>
          <div className="clear-hero-image">
            <img
              src="/images/hero-living-clean.png"
              alt="Huangjia ceramic tile in a contemporary interior"
            />
            <div className="hero-product-note">
              <span>One coordinated source</span>
              <strong>7 product families</strong>
              <p>60 published product groups</p>
            </div>
          </div>
        </section>

        <section className="home-path">
          <div className="home-path-title">
            <span className="micro-label">How this website works</span>
            <h2>From product search to quotation.</h2>
          </div>
          {[
            {
              icon: Search,
              number: "01",
              title: "Find a product",
              text: "Browse categories or search a model number."
            },
            {
              icon: ClipboardList,
              number: "02",
              title: "Build your selection",
              text: "Open product details and add the models you need."
            },
            {
              icon: Send,
              number: "03",
              title: "Send one enquiry",
              text: "Add quantities and send the complete selection to sales."
            },
            {
              icon: Truck,
              number: "04",
              title: "Confirm & deliver",
              text: "We confirm specifications, samples, price and shipping."
            }
          ].map(({ icon: Icon, number, title, text }) => (
            <article key={number}>
              <div><span>{number}</span><Icon size={19} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="home-categories">
          <div className="home-section-heading">
            <div>
              <span className="micro-label">Product categories</span>
              <h2>Start with what you need.</h2>
            </div>
            <div>
              <p>
                The same product structure as the original Huangjia website,
                presented as a faster, clearer catalogue.
              </p>
              <a href="/products">
                View all categories <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="clear-category-grid">
            {mainCategories.map((category, index) => (
              <a
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className={index === 0 ? "clear-category-card is-featured" : "clear-category-card"}
                key={category.name}
              >
                <img src={category.image} alt={category.name} />
                <span className="category-shade" />
                <small>0{index + 1}</small>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <i><ArrowRight size={18} /></i>
              </a>
            ))}
          </div>
          <div className="secondary-category-links">
            <a href="/products?category=Roofing%20Tile">
              <span>06</span> Roofing Tile <ArrowRight size={15} />
            </a>
            <a href="/products?category=Tile%20Accessories">
              <span>07</span> Tile Accessories <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section className="home-product-section">
          <div className="home-section-heading compact">
            <div>
              <span className="micro-label">Trending products</span>
              <h2>Recently added products.</h2>
            </div>
            <div>
              <p>Open a product to view every published image, model and specification.</p>
              <a href="/products">
                Complete catalogue <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="product-grid home-products-grid">
            {latestProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="home-why">
          <div className="home-why-image">
            <img src="/images/team-client.jpg" alt="Huangjia team meeting customers" />
          </div>
          <div className="home-why-copy">
            <span className="micro-label">Why Huangjia</span>
            <h2>One Foshan team.<br />A complete material package.</h2>
            <p>
              Huangjia supports distributors, designers and project teams with a
              coordinated range of tile, slabs, mosaics, wall panels, sanitaryware
              and accessories.
            </p>
            <ul>
              <li><Check size={16} /> Direct product and specification support</li>
              <li><Check size={16} /> Mixed-category sourcing and sample coordination</li>
              <li><Check size={16} /> Export packing and shipment communication</li>
              <li><Check size={16} /> OEM / ODM and project enquiries</li>
            </ul>
            <a href="/about">
              Learn about Huangjia <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="home-product-section home-featured">
          <div className="home-section-heading compact">
            <div>
              <span className="micro-label">Featured products</span>
              <h2>Explore more of the range.</h2>
            </div>
            <div>
              <p>Add any model to your selection—there is no online payment or fake $0 price.</p>
              <a href="/cart">
                View my selection <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="product-grid home-featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="home-updates">
          <div className="home-section-heading compact">
            <div>
              <span className="micro-label">Recent updates</span>
              <h2>News from Huangjia.</h2>
            </div>
            <a href="/news">View all news <ArrowRight size={16} /></a>
          </div>
          <div className="home-news-grid">
            {catalog.news.map((article, index) => (
              <a href={`/news/${article.slug}`} key={article.slug}>
                <div>
                  <img
                    src={index === 0 ? "/images/detail-floor.jpg" : "/images/team-client.jpg"}
                    alt={article.title}
                  />
                  <span>{index === 0 ? "Notice" : "Blog"}</span>
                </div>
                <small>{article.date}</small>
                <h3>{article.title}</h3>
                <p>{article.content.slice(0, 145)}…</p>
                <b>Read more <ArrowRight size={15} /></b>
              </a>
            ))}
          </div>
        </section>

        <section className="home-final-cta">
          <div>
            <PackageCheck size={27} />
            <span className="micro-label">Ready to source?</span>
            <h2>Tell us what products you need.</h2>
          </div>
          <p>
            Send a product model, quantity and destination. Our team will reply with
            specifications, availability and quotation details.
          </p>
          <a href="/contact">
            Start an enquiry <ArrowRight size={17} />
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
