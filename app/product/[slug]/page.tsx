import { notFound } from "next/navigation";
import { ProductDetail } from "../../components/ProductDetail";
import { catalog } from "../../lib/catalog";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

export function generateStaticParams() {
  return catalog.products.map((product) => ({ slug: product.slug }));
}
