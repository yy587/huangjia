import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "../../components/ProductDetail";
import { catalog, primaryModel } from "../../lib/catalog";

const publicBase = "https://yy587.github.io/huangjia";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) return {};
  const title = `${primaryModel(product.name)} | HUANGJIA Surfaces`;
  const description = product.summary || `Request specifications and an export quotation for ${primaryModel(product.name)}.`;
  const image = product.images[0]?.startsWith("http") ? product.images[0] : `${publicBase}${product.images[0] || "/images/bathroom.jpg"}`;
  return { title, description, alternates: { canonical: `${publicBase}/product/${product.slug}/` }, openGraph: { title, description, images: [image] } };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) notFound();
  const images = product.images.map((image) => image.startsWith("http") ? image : `${publicBase}${image}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: primaryModel(product.name),
    description: product.summary || product.description.slice(0, 280),
    image: images,
    sku: product.slug,
    category: product.category,
    manufacturer: { "@type": "Organization", name: catalog.contact.company },
    url: `${publicBase}/product/${product.slug}/`
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ProductDetail product={product} /></>;
}

export function generateStaticParams() {
  return catalog.products.map((product) => ({ slug: product.slug }));
}
