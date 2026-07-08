'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'Recovery Gifts', href: '/recovery-gifts' },
  { label: 'Mastectomy Care', href: '/shop?category=mastectomy-recovery-gifts' },
  { label: 'Port Pillows', href: '/shop?category=port-pillows' },
  { label: 'Ornaments', href: '/shop?category=personalized-ornaments' },
  { label: 'Keepsakes', href: '/shop?category=religious-keepsakes' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="relative z-[70] bg-ink px-4 py-2 text-center text-xs font-medium tracking-wide text-ivory/90">
        Handmade recovery gifts, keepsakes, and personalized comfort items — crafted with care in Raleigh, NC.
      </div>
      <header className={cn('sticky top-0 z-[70] transition-all duration-300', scrolled ? 'border-b border-ink/10 bg-cream/85 shadow-sm backdrop-blur-xl' : 'bg-cream/30 backdrop-blur-sm')}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lg font-bold text-honey shadow-glow">DB</span>
            <span>
              <span className="block font-serif text-xl leading-none tracking-tight">Dancing Bee</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.26em] text-honeyDark">Designs</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => <Link key={item.href} href={item.href} className="focus-ring rounded-full text-sm font-semibold text-ink/72 transition hover:text-ink">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="focus-ring relative rounded-full bg-white/70 p-3 shadow-sm" onClick={openCart} aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-honey px-1 text-xs font-bold text-ink">{itemCount}</span>}
            </button>
            <button className="focus-ring rounded-full bg-white/70 p-3 shadow-sm lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 28 }} className="ml-auto h-full w-[86%] max-w-sm bg-ivory p-6 shadow-soft">
              <div className="mb-8 flex items-center justify-between">
                <p className="font-serif text-2xl">Menu</p>
                <button className="focus-ring rounded-full bg-white p-2" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
              </div>
              <nav className="grid gap-3">
                {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-ink/10 bg-white/65 px-4 py-4 font-semibold">{item.label}</Link>)}
                <Link href="/shop" onClick={() => setOpen(false)} className="rounded-2xl bg-ink px-4 py-4 font-semibold text-ivory">Browse All Gifts</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
