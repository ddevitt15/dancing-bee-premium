'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '@/types';
import { products } from '@/data/products';
import { collections } from '@/data/collections';
import { ProductCard } from '@/components/product/product-card';
import { QuickViewModal } from '@/components/product/quick-view-modal';
import { Button } from '@/components/ui/button';

export function ShopClient() {
  const params = useSearchParams();
  const initialCategory = params.get('category') ?? 'all';
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(150);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((product) => category === 'all' || product.collections.includes(category as any))
      .filter((product) => product.price <= maxPrice)
      .filter((product) => !q || [product.title, product.description, product.subtitle, ...product.tags].join(' ').toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'name') return a.title.localeCompare(b.title);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [category, query, sort, maxPrice]);

  const Filters = (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-honeyDark">Search</label>
        <div className="flex items-center rounded-full border border-ink/10 bg-white px-4 py-3">
          <Search className="mr-2 h-4 w-4 text-ink/40" />
          <input className="w-full bg-transparent text-sm outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search gifts, pillows, ornaments..." />
        </div>
      </div>
      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-honeyDark">Collections</label>
        <div className="grid gap-2">
          <button onClick={() => setCategory('all')} className={`rounded-full px-4 py-3 text-left text-sm font-semibold transition ${category === 'all' ? 'bg-ink text-ivory' : 'bg-white text-ink hover:bg-linen'}`}>All gifts</button>
          {collections.map((collection) => <button key={collection.slug} onClick={() => setCategory(collection.slug)} className={`rounded-full px-4 py-3 text-left text-sm font-semibold transition ${category === collection.slug ? 'bg-ink text-ivory' : 'bg-white text-ink hover:bg-linen'}`}>{collection.name}</button>)}
        </div>
      </div>
      <div>
        <label htmlFor="price" className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-honeyDark">Max price: ${maxPrice}</label>
        <input id="price" type="range" min="5" max="150" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-honey" />
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-honey-radial px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Premium handmade shop</p>
          <h1 className="max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">Shop recovery gifts, keepsakes, and comfort items.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">Use filters to find the right gift by moment, need, price, and recipient.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['mastectomy-recovery-gifts', 'cancer-care-packages', 'port-pillows', 'graduation-gifts'].map((slug) => <button key={slug} onClick={() => setCategory(slug)} className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white">{collections.find((c) => c.slug === slug)?.name}</button>)}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="hidden rounded-[2rem] border border-ink/10 bg-white/55 p-5 shadow-sm lg:block">{Filters}</aside>
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">{filtered.length} products</p>
            <div className="flex gap-2">
              <button onClick={() => setFiltersOpen(true)} className="focus-ring rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-sm lg:hidden"><SlidersHorizontal className="mr-2 inline h-4 w-4" /> Filters</button>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-honey">
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickView} />)}
          </div>
          {filtered.length === 0 && <div className="rounded-[2rem] bg-white p-10 text-center"><p className="font-serif text-3xl">No gifts found.</p><p className="mt-2 text-ink/65">Try a different category, search, or price range.</p><Button className="mt-6" onClick={() => { setCategory('all'); setQuery(''); setMaxPrice(150); }}>Reset filters</Button></div>}
        </div>
      </section>
      <AnimatePresence>
        {filtersOpen && <motion.div className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="absolute bottom-0 max-h-[84vh] w-full overflow-auto rounded-t-[2rem] bg-ivory p-5"><div className="mb-5 flex items-center justify-between"><p className="font-serif text-2xl">Filters</p><button className="rounded-full bg-white p-2" onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button></div>{Filters}</motion.div></motion.div>}
      </AnimatePresence>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
