'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Minus, Plus, Send, ShoppingBag, Star, Truck } from 'lucide-react';
import type { Product } from '@/types';
import { relatedProducts } from '@/data/products';
import { formatMoney } from '@/lib/utils';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { QuickViewModal } from '@/components/product/quick-view-modal';

const faqs = [
  { question: 'Can this be sent directly as a gift?', answer: 'Yes. Add the recipient shipping address at checkout and include a gift note in the cart or product form.' },
  { question: 'Can I customize fabric or personalization?', answer: 'Many items include fabric or personalization options. Use the variant selector and note field, or contact the shop for custom requests.' },
  { question: 'Is the port pillow a safety device?', answer: 'No. It is designed for cushioning only and is not a safety device.' },
  { question: 'How soon will it ship?', answer: 'Processing time depends on the specific handmade item. Recovery listings commonly show 6–8 business days.' }
];

export function ProductPageClient({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [giftNote, setGiftNote] = useState('');
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quickView, setQuickView] = useState<Product | null>(null);
  const { addItem } = useCart();
  const related = useMemo(() => relatedProducts(product.slug), [product.slug]);
  const variantLabel = Object.entries(selected).map(([key, value]) => `${key}: ${value}`).join(' · ');

  function addToCart(openCheckout = false) {
    addItem({ productId: product.id, slug: product.slug, title: product.title, price: product.price, image: product.image, quantity, variant: variantLabel || undefined, giftNote: giftNote || undefined });
    if (openCheckout) setTimeout(() => { window.location.href = '/checkout'; }, 250);
  }

  return (
    <>
      <section className="bg-honey-radial px-4 py-5 text-sm sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl text-ink/65"><Link href="/shop" className="font-semibold text-honeyDark">Shop</Link> / {product.title}</div></section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div>
          <motion.div layout className="overflow-hidden rounded-[2.5rem] bg-linen shadow-soft"><img src={mainImage} alt={product.title} className="aspect-[4/3] w-full object-cover" /></motion.div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.gallery.map((image) => <button key={image} onClick={() => setMainImage(image)} className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl border ${mainImage === image ? 'border-honey ring-2 ring-honey/30' : 'border-ink/10'}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2.5rem] border border-ink/10 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {product.bestseller && <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-ivory">Best seller</span>}
              {product.donationEligible && <span className="rounded-full bg-honey/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-honeyDark">Donation eligible</span>}
              {product.freeShipping && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink/65">Free shipping</span>}
            </div>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{product.title}</h1>
            <p className="mt-4 text-lg leading-8 text-ink/68">{product.longDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4"><span className="text-3xl font-bold">{formatMoney(product.price)}</span>{product.rating && <span className="flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-sm font-semibold"><Star className="h-4 w-4 fill-honey text-honey" /> {product.rating.toFixed(1)} {product.reviewCount ? `(${product.reviewCount})` : ''}</span>}</div>
            {product.variants?.map((variant) => (
              <label key={variant.name} className="mt-6 block">
                <span className="mb-2 block text-sm font-bold">{variant.name}</span>
                <select value={selected[variant.name] ?? ''} onChange={(event) => setSelected((prev) => ({ ...prev, [variant.name]: event.target.value }))} className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-honey">
                  <option value="">Select an option</option>
                  {variant.values.map((value) => <option value={value} key={value}>{value}</option>)}
                </select>
              </label>
            ))}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-bold">Quantity</span>
              <div className="flex items-center rounded-full border border-ink/10 bg-white"><button className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></button><span className="w-10 text-center font-bold">{quantity}</span><button className="p-3" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></button></div>
            </div>
            <label className="mt-6 flex gap-3 rounded-2xl bg-cream p-4 text-sm font-semibold"><input type="checkbox" className="accent-honey" onChange={(e) => e.currentTarget.checked ? setGiftNote(giftNote || 'Please include a handwritten gift note.') : setGiftNote('')} /> Send as a gift</label>
            <textarea value={giftNote} onChange={(e) => setGiftNote(e.target.value)} placeholder="Personal note or customization request..." className="mt-3 min-h-24 w-full rounded-2xl border border-ink/10 bg-white p-4 outline-none focus:border-honey" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><Button onClick={() => addToCart()}><ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart</Button><Button variant="dark" onClick={() => addToCart(true)}><Send className="mr-2 h-4 w-4" /> Buy Now</Button></div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2"><Button variant="secondary" onClick={() => addToCart()}><Heart className="mr-2 h-4 w-4" /> Send as a Gift</Button><Button variant="ghost" href="/contact?reason=Help%20choosing%20a%20gift"><MessageCircle className="mr-2 h-4 w-4" /> Ask a Question</Button></div>
            <div className="mt-6 grid gap-3 text-sm text-ink/65 sm:grid-cols-3"><span className="flex gap-2"><Truck className="h-4 w-4 text-honeyDark" /> Ships from NC</span><span>Gift note option</span><span>Handmade details</span></div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div><h2 className="font-serif text-4xl">What is included</h2><p className="mt-4 leading-8 text-ink/68">{product.description}</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{product.details.map((detail) => <div key={detail} className="rounded-3xl border border-ink/10 bg-white/65 p-5"><span className="mb-3 block h-2 w-2 rounded-full bg-honey" />{detail}</div>)}</div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"><FAQAccordion items={faqs} /></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="mb-8 font-serif text-4xl">Complete the gift</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} onQuickView={setQuickView} />)}</div></section>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/95 p-3 shadow-soft backdrop-blur lg:hidden"><Button className="w-full" onClick={() => addToCart()}>{formatMoney(product.price)} · Add to Cart</Button></div>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
