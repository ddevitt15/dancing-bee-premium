import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/data/products';
import { breadcrumbSchema, productSchema } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';
import { ProductPageClient } from '@/components/product/product-page-client';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return { title: `${product.title} | Dancing Bee Designs`, description: product.description, keywords: product.seoKeywords };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: siteUrl }, { name: 'Shop', url: `${siteUrl}/shop` }, { name: product.title, url: `${siteUrl}/products/${product.slug}` }])) }} />
      <ProductPageClient product={product} />
    </>
  );
}
