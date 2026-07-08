import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = collections.find((item) => item.slug === params.slug);
  if (!collection) return {};
  return { title: collection.seoTitle, description: collection.seoDescription };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = collections.find((item) => item.slug === params.slug);
  if (!collection) notFound();
  const collectionProducts = products.filter((product) => product.collections.includes(collection.slug));
  return (
    <>
      <section className="bg-honey-radial px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Collection</p>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">{collection.name}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/68">{collection.seoDescription}</p>
          <div className="mt-8"><Button href="/shop">Back to full shop</Button></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collectionProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </>
  );
}
