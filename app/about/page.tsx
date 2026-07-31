import { ArrowRight } from "lucide-react";
import { SiteShell } from "../components/SiteShell";

const originalAboutText = [
  "HUANGJIA is a leading building material product company that has been dedicated to providing high-quality building material products to our customers for many years. Our company specializes in developing and manufacturing advanced building materia products that meet customers’ specific needs.",
  "We are committed to delivering the latest technology and best quality to our customers. We believe that by developing products that are innovative, reliable, and of the highest quality, we can achieve a win-win situation for both our customers and ourselves.",
  "Our products are made with the highest quality standards, and we believe that our products offer exceptional value to our customers. Our products are widely recognized for their innovative design, advanced technology, and high quality materials. We strive to maintain this level of service and quality for our customers by providing prompt and comprehensive after-sales support.",
  "Our company’s mission is to Create a win-win situation between customer and company by providing high-quality Audio products, exceptional service, and a strong connection with our customers. We believe that by working together, we can Create a positive impact on both our customers and ourselves.",
  "We are proud of our reputation for exceptional building materia products, after-sales service, and committed team work, we are dedicated to continue to providing our customers with high-quality building materia Introduction."
];

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="catalog-main">
        <section className="page-hero about-hero original-about-hero">
          <div>
            <span className="micro-label">Foshan Huangjia Building Material Co., Ltd.</span>
            <h1>About Us</h1>
          </div>
        </section>

        <section className="about-image-band original-about-image">
          <img
            src="/images/team-client.jpg"
            alt="Foshan Huangjia Building Material Co., Ltd."
          />
        </section>

        <section className="original-about-content">
          <div className="original-about-title">
            <span className="micro-label">About Us</span>
            <h2>Foshan Huangjia<br />Building Material Co., Ltd.</h2>
          </div>
          <div className="original-about-copy">
            {originalAboutText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="original-about-actions">
              <a href="/products">
                Products <ArrowRight size={16} />
              </a>
              <a href="/contact">
                Contact Us <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
