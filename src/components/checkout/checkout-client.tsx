'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/lib/schemas';
import type { z } from 'zod';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/utils';

type CheckoutForm = Omit<z.infer<typeof checkoutSchema>, 'items'>;

export function CheckoutClient() {
  const { items, subtotal, giftNote, clearCart } = useCart();
  const [status, setStatus] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema.omit({ items: true })), defaultValues: { country: 'US', isGift: false, giftMessage: giftNote } });
  const isGift = watch('isGift');

  async function onSubmit(values: CheckoutForm) {
    setStatus('Creating checkout...');
    const payload = { ...values, items, giftMessage: values.giftMessage || giftNote };
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error ?? 'Checkout failed.');
      return;
    }
    if (data.testMode) clearCart();
    window.location.href = data.url;
  }

  if (items.length === 0) {
    return <section className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="font-serif text-5xl">Your cart is empty.</h1><p className="mt-4 text-ink/65">Add a recovery gift or keepsake before checkout.</p><Button href="/shop" className="mt-8">Browse gifts</Button></section>;
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2.5rem] border border-ink/10 bg-white/70 p-6 shadow-soft sm:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Secure checkout</p>
        <h1 className="font-serif text-4xl">Shipping and gift details</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Field label="Email" error={errors.email?.message}><input type="email" {...register('email')} className="field" /></Field>
          <Field label="Full name" error={errors.name?.message}><input {...register('name')} className="field" /></Field>
          <Field label="Phone optional" error={errors.phone?.message}><input {...register('phone')} className="field" /></Field>
          <Field label="Country" error={errors.country?.message}><input {...register('country')} className="field" /></Field>
          <Field label="Address line 1" error={errors.address1?.message} className="sm:col-span-2"><input {...register('address1')} className="field" /></Field>
          <Field label="Address line 2 optional" error={errors.address2?.message} className="sm:col-span-2"><input {...register('address2')} className="field" /></Field>
          <Field label="City" error={errors.city?.message}><input {...register('city')} className="field" /></Field>
          <Field label="State" error={errors.state?.message}><input {...register('state')} className="field" /></Field>
          <Field label="Postal code" error={errors.postalCode?.message}><input {...register('postalCode')} className="field" /></Field>
        </div>
        <label className="mt-6 flex gap-3 rounded-2xl bg-cream p-4 text-sm font-semibold"><input type="checkbox" {...register('isGift')} className="accent-honey" /> This is a gift going directly to the recipient</label>
        {isGift && <Field label="Recipient name optional" className="mt-4" error={errors.recipientName?.message}><input {...register('recipientName')} className="field" /></Field>}
        <Field label="Gift message optional" className="mt-4" error={errors.giftMessage?.message}><textarea {...register('giftMessage')} className="field min-h-32" placeholder="Write the note you want included..." /></Field>
        <Button type="submit" className="mt-7 w-full">Continue to payment</Button>
        {status && <p className="mt-4 text-sm font-semibold text-honeyDark">{status}</p>}
        <style jsx>{`.field{width:100%;border-radius:1rem;border:1px solid rgba(30,26,22,.1);background:#fff;padding:.9rem 1rem;outline:none}.field:focus{border-color:#c98f2c}`}</style>
      </form>
      <aside className="h-fit rounded-[2.5rem] border border-ink/10 bg-ivory p-6 shadow-soft sm:p-8 lg:sticky lg:top-28">
        <h2 className="font-serif text-3xl">Order summary</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => <div key={`${item.productId}-${item.variant ?? 'default'}`} className="grid grid-cols-[72px_1fr] gap-4"><img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover" /><div><p className="font-semibold leading-snug">{item.title}</p><p className="mt-1 text-sm text-ink/55">Qty {item.quantity}{item.variant ? ` · ${item.variant}` : ''}</p><p className="mt-1 font-bold">{formatMoney(item.price * item.quantity)}</p></div></div>)}
        </div>
        <div className="mt-6 border-t border-ink/10 pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div><div className="mt-2 flex justify-between"><span>Shipping</span><span>Calculated / free where eligible</span></div><div className="mt-5 flex justify-between text-lg font-bold"><span>Total today</span><span>{formatMoney(subtotal)}</span></div></div>
        <p className="mt-5 rounded-2xl bg-honey/10 p-4 text-sm leading-6 text-ink/65">Stripe checkout turns on automatically when keys are added. Without keys, this demo creates a pending test order and redirects to confirmation.</p>
      </aside>
    </section>
  );
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
