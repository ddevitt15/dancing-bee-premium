'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/types';
import { formatMoney } from '@/lib/utils';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (product: Product) => void }) {
  const { addItem } = useCart();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.36 }}
      className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70 shadow-sm backdrop-blur transition-shadow hover:shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-linen">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {product.bestseller && <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-ivory">Best seller</span>}
          {product.donationEligible && <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">Donation eligible</span>}
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-lg font-bold text-ink">{formatMoney(product.price)}</p>
          {product.rating && <p className="flex items-center gap-1 text-xs font-semibold text-ink/70"><Star className="h-4 w-4 fill-honey text-honey" /> {product.rating.toFixed(1)} {product.reviewCount ? `(${product.reviewCount})` : ''}</p>}
        </div>
        <h3 className="line-clamp-2 min-h-[3.25rem] font-serif text-xl leading-snug text-ink"><Link href={`/products/${product.slug}`}>{product.title}</Link></h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/62">{product.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button className="px-3" onClick={() => addItem({ productId: product.id, slug: product.slug, title: product.title, price: product.price, image: product.image, quantity: 1 })}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Add
          </Button>
          {onQuickView ? (
            <Button variant="secondary" className="px-3" onClick={() => onQuickView(product)}>
              <Eye className="mr-2 h-4 w-4" /> Quick view
            </Button>
          ) : (
            <Button variant="secondary" className="px-3" href={`/products/${product.slug}`}>
              <Eye className="mr-2 h-4 w-4" /> Quick view
            </Button>
          )}
        </div>
        <Link href={`/products/${product.slug}`} className="focus-ring mt-3 inline-flex text-sm font-semibold text-honeyDark hover:text-ink">View details →</Link>
      </div>
    </motion.article>
  );
}
