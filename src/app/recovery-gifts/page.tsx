import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { bestSellers, products } from '@/data/products';
import { AnimatedSection, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { faqSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mastectomy Recovery Gifts | Handmade Comfort Care Packages',
  description: 'Send a thoughtful handmade mastectomy recovery gift with comfort items, port pillows, recovery pillows, drain holders, and meaningful care-package details.',
  keywords: ['mastectomy recovery gifts', 'breast cancer surgery gifts', 'cancer care package', 'port pillow', 'chemo care gift', 'handmade recovery gift']
};

const faqs = [
  { question: 'What is a good mastectomy recovery gift?', answer: 'A good gift is both practical and comforting: heart pillows, drain holders, port pillows, tote bags, note cards, and simple personal touches are all helpful ideas.' },
  { question: 'What is a port pillow used for?', answer: 'A port pillow cushions the area where a seatbelt rests on the chest. It is for comfort only and is not a safety device.' },
  { question: 'Why include drain holders?', answer: 'Drain holders help keep surgical drains more secure during recovery routines, including everyday movement and showering.' },
  { question: 'Can I send this directly to someone going through treatment?', answer: 'Yes. Add the recipient’s shipping address and include a gift message so it arrives ready to open.' }
];

export default function RecoveryGiftsPage() {
  const recoveryProducts = products.filter((product) => product.collections.some((collection) => ['mastectomy-recovery-gifts', 'cancer-care-packages', 'port-pillows', 'drain-holders'].includes(collection))).slice(0, 8);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <section className="relative overflow-hidden bg-honey-radial px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 honeycomb opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark shadow-sm">Recovery gift guide</p>
            <h1 className="font-serif text-5xl leading-tight sm:text-6xl">What to send when you don’t know what to say.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Shop handmade mastectomy recovery gifts, breast cancer surgery gifts, cancer care packages, port pillows, drain holders, and comfort items that feel useful, personal, and warm.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="#recommendations">Shop recommended gifts <ArrowRight className="ml-2 h-4 w-4" /></Button><Button variant="secondary" href="/contact?reason=Help%20choosing%20a%20gift">Help me choose</Button></div>
          </div>
          <img src="/images/recovery-gift.svg" alt="Handmade recovery gift box" className="rounded-[2.5rem] shadow-soft" />
        </div>
      </section>

      <AnimatedSection>
        <SectionHeader eyebrow="Gift strategy" title="Recovery gifts should solve a real problem and still feel personal." copy="The strongest gift is not a random basket. It is a clear mix of support, comfort, and a message that says: I thought about what you actually need." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Comfort after surgery', 'Heart pillows and soft recovery pillows can help cushion tender areas during rest and movement.', HeartHandshake],
            ['Treatment and travel support', 'Port pillows offer small cushioning on car rides to appointments and everyday travel.', PackageCheck],
            ['More secure routines', 'Drain holders are practical details that make recovery feel a little less stressful.', ShieldCheck]
          ].map(([title, copy, Icon]) => {
            const RealIcon = Icon as typeof HeartHandshake;
            return <div key={String(title)} className="rounded-[2rem] border border-ink/10 bg-white/65 p-6 shadow-sm"><RealIcon className="mb-8 h-7 w-7 text-honeyDark" /><h2 className="font-serif text-2xl">{title as string}</h2><p className="mt-3 text-sm leading-7 text-ink/65">{copy as string}</p></div>;
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection id="recommendations" className="bg-ivory/70">
        <SectionHeader eyebrow="Bundle recommendations" title="Start with the gift that matches the recovery moment." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recoveryProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-white/65 p-8 shadow-soft">
            <Sparkles className="mb-6 h-7 w-7 text-honeyDark" />
            <h2 className="font-serif text-4xl">Mastectomy recovery gift guide</h2>
            <p className="mt-5 leading-8 text-ink/68">Choose a complete care package when you want the safest all-in-one gift. Choose a port pillow or note card when you want a smaller but still meaningful add-on. Choose drain holders when the gift needs to be especially practical.</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-ink/70">
              <li>• Best all-in-one option: deluxe mastectomy recovery gift set.</li>
              <li>• Best under-$15 option: minky port pillow or pocket hug.</li>
              <li>• Best practical add-on: drain holder set.</li>
              <li>• Best emotional add-on: handmade note cards or awareness ribbon.</li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] bg-ink p-8 text-ivory shadow-soft">
            <h2 className="font-serif text-4xl">Port pillow + drain holder explained</h2>
            <p className="mt-5 leading-8 text-ivory/65">The port pillow is a small minky cushion that attaches to the seatbelt and cushions the chest area. Drain holders help keep drains held more securely during daily routines. Together, they make the gift feel specific to the recovery experience.</p>
            <Button variant="dark" href="/products/minky-port-pillow-for-seatbelt-chemo-pacemaker-surgery-recovery" className="mt-7">View port pillow</Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pt-0">
        <SectionHeader eyebrow="FAQ" title="Recovery gift questions" />
        <FAQAccordion items={faqs} />
      </AnimatedSection>

      <section className="bg-ink px-4 py-20 text-center text-ivory sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-tight">Send practical comfort with handmade care.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ivory/65">Start with the recovery gift set, or choose a smaller support item that still feels thoughtful.</p>
        <div className="mt-8"><Button variant="dark" href="/shop?category=mastectomy-recovery-gifts">Shop Mastectomy Recovery Gifts</Button></div>
      </section>
    </>
  );
}
