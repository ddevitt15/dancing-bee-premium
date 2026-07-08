'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, HeartHandshake, PackageCheck, Sparkles, Star, Truck } from 'lucide-react';
import { bestSellers, reviews } from '@/data/products';
import { collections } from '@/data/collections';
import type { Product } from '@/types';
import { AnimatedSection, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { QuickViewModal } from '@/components/product/quick-view-modal';
import { FAQAccordion } from '@/components/ui/faq-accordion';

const quiz = [
  { label: 'Someone recovering from surgery', target: '/shop?category=mastectomy-recovery-gifts' },
  { label: 'Someone going through cancer treatment', target: '/shop?category=cancer-care-packages' },
  { label: 'A personalized keepsake', target: '/shop?category=personalized-ornaments' },
  { label: 'A graduation or milestone gift', target: '/shop?category=graduation-gifts' },
  { label: 'A religious or faith-based gift', target: '/shop?category=religious-keepsakes' }
];

const faqs = [
  { question: 'What should I send someone after mastectomy surgery?', answer: 'A useful recovery gift usually includes comfort pillows, drain holders, a port pillow, and a simple gift note. The goal is practical support with a warm, personal feel.' },
  { question: 'Can I ship directly to the recipient?', answer: 'Yes. Use the recipient address at checkout and add a gift note so the package feels personal when it arrives.' },
  { question: 'Can I include a gift message?', answer: 'Yes. The product page and cart both include gift-note options.' },
  { question: 'Are the products handmade?', answer: 'Yes. Dancing Bee Designs is a handmade shop with sewn, knitted, and created items for people and homes.' },
  { question: 'How fast do items ship?', answer: 'Processing time varies by item. Recovery listings commonly show a 6–8 business day processing window.' },
  { question: 'Can I request customization?', answer: 'Yes. Use the contact page for custom order questions, fabric requests, and gift-message help.' },
  { question: 'Do you sell on Etsy too?', answer: 'Yes. Dancing Bee Designs also has an Etsy shop with customer reviews and active listings.' }
];

export function HomePage() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const trustBadges = [
    { label: 'Star Seller', Icon: Star },
    { label: '5-star Etsy average', Icon: Sparkles },
    { label: 'Ships from NC', Icon: Truck },
    { label: 'Handmade care', Icon: HeartHandshake }
  ];
  return (
    <>
      <section className="relative isolate overflow-hidden bg-honey-radial px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24">
        <motion.div aria-hidden className="absolute inset-0 -z-10 honeycomb opacity-60" animate={{ backgroundPosition: ['0px 0px', '80px 40px'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-5 inline-flex rounded-full border border-honey/25 bg-white/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark shadow-sm backdrop-blur">Handmade comfort gifts</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">Handmade gifts for healing, comfort, and meaningful moments.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">Thoughtful recovery care packages, port pillows, keepsakes, and personalized gifts made to help people feel loved when words are not enough.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/recovery-gifts">Shop Recovery Gifts <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button variant="secondary" href="#gift-finder">Find the Right Gift</Button>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {trustBadges.map(({ label, Icon }) => (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-white/60 bg-white/55 p-3 text-sm font-semibold shadow-sm backdrop-blur">
                  <Icon className="mb-2 h-4 w-4 text-honeyDark" />{label}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="relative min-h-[520px]">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75 }} className="absolute left-4 top-8 w-[72%] overflow-hidden rounded-[2.4rem] bg-white p-3 shadow-soft sm:left-16">
              <img src="/images/recovery-gift.svg" alt="Premium recovery gift set" className="aspect-[4/3] w-full rounded-[1.7rem] object-cover" />
            </motion.div>
            <motion.div animate={{ y: [0, -16, 0], rotate: [-1, 1.5, -1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-1 top-4 w-44 rounded-[2rem] bg-white/85 p-3 shadow-glow backdrop-blur sm:right-8 sm:w-56">
              <img src="https://i.etsystatic.com/7513710/r/il/50065d/5541866263/il_fullxfull.5541866263_n6hi.jpg" alt="Minky port pillows" className="aspect-square rounded-[1.45rem] object-cover" />
              <p className="mt-3 text-sm font-bold">Port pillows</p>
            </motion.div>
            <motion.div animate={{ y: [0, 18, 0], rotate: [1, -1.5, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-8 left-0 w-48 rounded-[2rem] bg-white/90 p-3 shadow-soft sm:left-8 sm:w-64">
              <img src="/images/ornament.svg" alt="Personalized keepsake ornament" className="aspect-[4/3] rounded-[1.45rem] object-cover" />
              <p className="mt-3 text-sm font-bold">Personalized keepsakes</p>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-0 right-2 rounded-3xl border border-honey/20 bg-ink p-5 text-ivory shadow-soft sm:right-16">
              <p className="text-3xl font-bold">1,739</p>
              <p className="max-w-44 text-sm text-ivory/65">Port pillows donated to hospitals as of Mar. 31, 2026.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection id="gift-finder">
        <SectionHeader eyebrow="Gift finder" title="Not sure what to send?" copy="Answer one quick question and we’ll guide you to the most thoughtful gift." />
        <div className="grid gap-3 md:grid-cols-5">
          {quiz.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <Link href={item.target} className="group flex min-h-44 flex-col justify-between rounded-[2rem] border border-ink/10 bg-white/65 p-5 shadow-sm transition hover:-translate-y-1 hover:border-honey/40 hover:shadow-soft">
                <Gift className="h-6 w-6 text-honeyDark" />
                <span className="font-serif text-xl leading-tight">{item.label}</span>
                <span className="text-sm font-semibold text-honeyDark">Show gifts →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="pt-0">
        <SectionHeader eyebrow="Shop by moment" title="Choose the gift by what they’re going through." copy="Recovery gifts are the lead category, but the shop also supports keepsakes, milestones, faith-based encouragement, and personalized handmade moments." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 8).map((collection) => (
            <Link href={`/shop?category=${collection.slug}`} key={collection.slug} className="group rounded-[2rem] border border-ink/10 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/15 text-honeyDark"><PackageCheck className="h-5 w-5" /></div>
              <h3 className="font-serif text-2xl">{collection.name}</h3>
              <p className="mt-2 text-sm text-ink/62">{collection.line}</p>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="featured-products" className="bg-ivory/60">
        <SectionHeader eyebrow="Best sellers" title="Comfort-first gifts people understand immediately." copy="Product cards prioritize what the gift does, who it helps, and why it matters — not just what it is." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickView} />)}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Recovery care value</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Built for comfort, chosen with love.</h2>
            <p className="mt-5 text-lg leading-8 text-ink/68">When someone you love is recovering, it can be hard to know what to send. These gifts make the choice clearer by pairing practical recovery support with handmade warmth.</p>
            <Button href="/recovery-gifts" className="mt-8">Explore recovery gifts</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['Practical support', 'Useful items designed to help during recovery, travel, treatment, and everyday comfort.'],
              ['Gift-ready care', 'Thoughtfully arranged so you can send something meaningful without second guessing.'],
              ['Handmade warmth', 'Created by hand with details that feel personal, comforting, and human.']
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[2rem] border border-ink/10 bg-white/65 p-6 shadow-sm"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-ink/65">{copy}</p></div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-ink text-ivory">
        <SectionHeader eyebrow="Etsy trust" title="Proof that the gift feels meaningful when it arrives." copy="Customers consistently mention thoughtful packaging, fast shipping, quality craftsmanship, and meaningful gifts." />
        <div className="grid gap-4 md:grid-cols-4">
          {reviews.map((review) => (
            <div key={`${review.name}-${review.product}`} className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
              <p className="mb-4 flex gap-1 text-honey">★★★★★</p>
              <p className="font-serif text-2xl">“{review.excerpt}”</p>
              <p className="mt-4 text-sm text-ivory/55">{review.name} · {review.product}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><Button variant="dark" href="https://www.etsy.com/shop/DancingBeeDesigns">Read more reviews on Etsy</Button></div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-honey-radial p-6 shadow-soft sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Comfort that keeps going</p>
            <h2 className="font-serif text-4xl leading-tight">Port pillow giving adds another layer of care.</h2>
            <p className="mt-5 leading-8 text-ink/68">Donation-eligible listings state that a port pillow is donated to a local hospital for each sale, with 1,739 port pillows donated to hospitals as of March 31, 2026.</p>
            <Button href="/shop?category=port-pillows" className="mt-8">Shop port pillows</Button>
          </div>
          <img src="/images/port-pillow.svg" alt="Port pillow gift" className="h-full min-h-80 w-full rounded-[2rem] object-cover shadow-soft" />
        </div>
      </AnimatedSection>

      <AnimatedSection className="pt-0">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img src="/images/about-maker.svg" alt="Handmade in Raleigh NC" className="rounded-[2.5rem] shadow-soft" />
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Our story</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Made by hand. Chosen from the heart.</h2>
            <p className="mt-5 text-lg leading-8 text-ink/68">Dancing Bee Designs creates handmade gifts for the moments when people want to show up with care — recovery, treatment, faith, milestones, holidays, and everyday encouragement.</p>
            <Button href="/about" variant="secondary" className="mt-8">Meet Dancing Bee Designs</Button>
          </div>
        </div>
      </AnimatedSection>

      <EmailCapture />

      <AnimatedSection className="pt-0">
        <SectionHeader eyebrow="Questions" title="Helpful answers before you send the gift." />
        <FAQAccordion items={faqs} />
      </AnimatedSection>

      <section className="bg-ink px-4 py-20 text-center text-ivory sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-tight">Send comfort that feels personal.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ivory/65">Shop handmade recovery gifts, keepsakes, and personalized items crafted with care.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button variant="dark" href="/recovery-gifts">Shop Recovery Gifts</Button><Button variant="secondary" href="/shop">Browse All Gifts</Button></div>
      </section>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage('Saving...');
    const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setMessage(res.ok ? 'You’re on the list — gift ideas are coming.' : 'Something went wrong. Please try again.');
    if (res.ok) setEmail('');
  }
  return (
    <AnimatedSection className="pt-0">
      <form onSubmit={submit} className="mx-auto max-w-4xl rounded-[2.5rem] border border-honey/20 bg-white/70 p-6 text-center shadow-soft backdrop-blur sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Gift help</p>
        <h2 className="font-serif text-4xl">Need help choosing the right gift?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink/65">Get thoughtful gift ideas, new arrivals, and care-package updates.</p>
        <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3 rounded-full bg-cream p-2 sm:flex-row">
          <input className="min-h-12 flex-1 rounded-full bg-white px-5 outline-none focus:ring-2 focus:ring-honey" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" required />
          <Button type="submit">Send Me Gift Ideas</Button>
        </div>
        {message && <p className="mt-4 text-sm font-semibold text-honeyDark">{message}</p>}
      </form>
    </AnimatedSection>
  );
}
