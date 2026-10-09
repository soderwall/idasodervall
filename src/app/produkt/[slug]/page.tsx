import { getProductBySlug, getProducts } from '@/lib/data';
import { ProductDetailView } from '@/components/ProductDetailView';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
