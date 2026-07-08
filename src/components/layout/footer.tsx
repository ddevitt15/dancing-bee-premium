import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl">Dancing Bee Designs</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/65">Handmade recovery gifts, keepsakes, ornaments, and personalized comfort items created to help people show up with care.</p>
          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-honey">Raleigh, NC handmade shop</p>
        </div>
        <div>
          <p className="mb-4 font-bold">Shop</p>
          <div className="grid gap-3 text-sm text-ivory/70">
            <Link href="/recovery-gifts">Recovery gifts</Link>
            <Link href="/shop?category=port-pillows">Port pillows</Link>
            <Link href="/shop?category=graduation-gifts">Graduation gifts</Link>
            <Link href="/shop">All gifts</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold">Brand</p>
          <div className="grid gap-3 text-sm text-ivory/70">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="https://www.etsy.com/shop/DancingBeeDesigns">Etsy shop</Link>
            <Link href="https://www.instagram.com/dancingbeedesignsllc/">Instagram</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold">Trust</p>
          <div className="grid gap-3 text-sm text-ivory/70">
            <span>5-star Etsy average</span>
            <span>Star Seller on Etsy</span>
            <span>Free shipping on select gifts</span>
            <span>Gift note options</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-ivory/50">© 2026 Dancing Bee Designs. Demo ecommerce build.</div>
    </footer>
  );
}
