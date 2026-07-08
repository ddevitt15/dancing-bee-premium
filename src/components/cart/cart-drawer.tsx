'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/utils';
import { products } from '@/data/products';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, giftNote, setGiftNote } = useCart();
  const addOns = products.filter((product) => ['prod_port_pillow', 'prod_pocket_hug', 'prod_cards', 'prod_ribbon_ornament'].includes(product.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-ink/35 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} />
          <motion.aside className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-[460px] flex-col bg-ivory shadow-soft" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 240, damping: 28 }} aria-label="Shopping cart">
            <div className="flex items-center justify-between border-b border-ink/10 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-honeyDark">Your cart</p>
                <h2 className="font-serif text-2xl">Send comfort</h2>
              </div>
              <button className="focus-ring rounded-full bg-white p-2" onClick={closeCart} aria-label="Close cart"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 rounded-full bg-honey/15 p-5"><ShoppingBag className="h-8 w-8 text-honeyDark" /></div>
                  <h3 className="font-serif text-2xl">Your cart is waiting.</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">Start with a recovery gift, port pillow, or personalized keepsake.</p>
                  <Button href="/shop" className="mt-6" onClick={closeCart}>Browse gifts</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variant ?? 'default'}`} className="grid grid-cols-[88px_1fr] gap-4 rounded-3xl border border-ink/10 bg-white/70 p-3">
                      <img src={item.image} alt="" className="h-24 w-24 rounded-2xl object-cover" />
                      <div>
                        <div className="flex justify-between gap-2">
                          <div>
                            <Link href={`/products/${item.slug}`} onClick={closeCart} className="font-semibold leading-snug hover:text-honeyDark">{item.title}</Link>
                            {item.variant && <p className="mt-1 text-xs text-ink/55">{item.variant}</p>}
                          </div>
                          <button className="focus-ring h-8 rounded-full p-1 text-ink/55 hover:text-ink" onClick={() => removeItem(item.productId, item.variant)} aria-label="Remove item"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-ink/10 bg-ivory">
                            <button className="focus-ring p-2" onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)} aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button className="focus-ring p-2" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)} aria-label="Increase"><Plus className="h-3 w-3" /></button>
                          </div>
                          <p className="font-bold">{formatMoney(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-3xl border border-honey/25 bg-honey/10 p-4">
                    <label className="text-sm font-semibold" htmlFor="cart-gift-note">Gift note</label>
                    <textarea id="cart-gift-note" value={giftNote} onChange={(event) => setGiftNote(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-ink/10 bg-white p-3 text-sm outline-none focus:border-honey" placeholder="Add a personal note for the recipient..." />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-honeyDark">Recommended add-ons</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {addOns.map((product) => (
                        <Link href={`/products/${product.slug}`} onClick={closeCart} key={product.id} className="min-w-44 rounded-3xl border border-ink/10 bg-white p-3 transition hover:-translate-y-1 hover:shadow-soft">
                          <img src={product.image} alt="" className="h-24 w-full rounded-2xl object-cover" />
                          <p className="mt-2 line-clamp-2 text-sm font-semibold">{product.title}</p>
                          <p className="text-sm font-bold text-honeyDark">{formatMoney(product.price)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-ink/10 bg-white/70 p-5 backdrop-blur">
                <div className="mb-4 flex justify-between text-base font-bold"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                <Button href="/checkout" className="w-full" onClick={closeCart}>Checkout</Button>
                <Button variant="ghost" className="mt-2 w-full" onClick={closeCart}>Continue shopping</Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
