import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/section';

export const metadata: Metadata = {
  title: 'About Dancing Bee Designs | Handmade Gifts Crafted with Care',
  description: 'Learn about Dancing Bee Designs, a Raleigh, NC handmade shop creating recovery gifts, keepsakes, ornaments, and meaningful personalized comfort items.'
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-honey-radial px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">About the shop</p>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">Handmade gifts for moments that deserve care.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-ink/68">Dancing Bee Designs creates handmade gifts for recovery, treatment, faith, milestones, holidays, and everyday encouragement.</p>
        </div>
      </section>
      <AnimatedSection>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src="/images/about-maker.svg" alt="Handmade process" className="rounded-[2.5rem] shadow-soft" />
          <div>
            <h2 className="font-serif text-4xl">Made by hand. Chosen from the heart.</h2>
            <p className="mt-5 leading-8 text-ink/68">The brand centers on gifts that feel personal and useful. Recovery care packages, port pillows, drain holders, note cards, ornaments, and keepsakes are designed for buyers who want to send comfort but need help choosing the right thing.</p>
            <Button href="/shop" className="mt-8">Shop handmade gifts</Button>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Handmade process', 'Soft materials, careful sewing, personalized details, and gift-ready presentation.'],
            ['Why recovery gifts matter', 'They help friends and family send useful support during a vulnerable moment.'],
            ['Etsy trust proof', 'The Etsy shop shows a 5-star average, Star Seller status, and customer comments about fast shipping and meaningful gifts.']
          ].map(([title, copy]) => <div className="rounded-[2rem] border border-ink/10 bg-white/65 p-6 shadow-sm" key={title}><h2 className="font-serif text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-ink/65">{copy}</p></div>)}
        </div>
      </AnimatedSection>
    </>
  );
}
