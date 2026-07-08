import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage({ searchParams }: { searchParams: { order?: string; mode?: string } }) {
  return (
    <section className="bg-honey-radial px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-white/75 p-8 shadow-soft backdrop-blur sm:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Order received</p>
        <h1 className="font-serif text-5xl leading-tight">Your comfort gift is in motion.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-ink/68">Thank you. Your order has been recorded{searchParams.order ? ` as ${searchParams.order}` : ''}. If this was a local test checkout, connect Stripe and Supabase keys before taking real payments.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button href="/shop">Continue shopping</Button><Button variant="secondary" href="/contact">Ask a question</Button></div>
        <Link href="/admin/orders" className="mt-6 inline-flex text-sm font-semibold text-honeyDark">View demo orders →</Link>
      </div>
    </section>
  );
}
