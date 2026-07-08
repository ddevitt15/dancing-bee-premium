import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = { title: 'Contact Dancing Bee Designs', description: 'Contact Dancing Bee Designs for gift help, custom orders, existing orders, wholesale questions, or hospital donation inquiries.' };

export default function ContactPage() {
  return (
    <section className="bg-honey-radial px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Contact</p>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">Need help choosing a gift?</h1>
          <p className="mt-6 text-lg leading-8 text-ink/68">Send a message for custom order questions, recipient help, gift-note support, existing orders, or wholesale / hospital donation inquiries.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
