'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { X, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/types';
import { formatMoney } from '@/lib/utils';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem } = useCart();
  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/45 p-3 backdrop-blur-sm sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.98 }} className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-ivory shadow-soft sm:grid-cols-[0.95fr_1.05fr]">
            <button className="focus-ring absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm" onClick={onClose} aria-label="Close quick view"><X className="h-5 w-5" /></button>
            <div className="bg-linen"><img src={product.image} alt={product.title} className="h-full min-h-[340px] w-full object-cover" /></div>
            <div className="p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Quick view</p>
              <h3 className="font-serif text-3xl leading-tight text-ink">{product.title}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold">{formatMoney(product.price)}</span>
                {product.rating && <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm"><Star className="h-4 w-4 fill-honey text-honey" /> {product.rating.toFixed(1)}</span>}
                {product.freeShipping && <span className="rounded-full bg-white px-3 py-1 text-sm">Free shipping</span>}
              </div>
              <p className="mt-5 leading-7 text-ink/70">{product.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-ink/72">
                {product.details.slice(0, 4).map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-honey" />{detail}</li>)}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => addItem({ productId: product.id, slug: product.slug, title: product.title, price: product.price, image: product.image, quantity: 1 })}><ShoppingBag className="mr-2 h-4 w-4" /> Add to cart</Button>
                <Button variant="secondary" href={`/products/${product.slug}`}>View full details</Button>
              </div>
              <Link href="/contact?reason=Help%20choosing%20a%20gift" className="mt-5 inline-flex text-sm font-semibold text-honeyDark hover:text-ink">Ask a question about this gift →</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
