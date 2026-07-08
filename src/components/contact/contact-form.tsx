'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import type { z } from 'zod';

type Input = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Input>({ resolver: zodResolver(contactSchema), defaultValues: { reason: 'Help choosing a gift' } });
  async function onSubmit(values: Input) {
    setStatus('Sending...');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    setStatus(res.ok ? 'Message saved. Dancing Bee Designs can follow up from here.' : 'Something went wrong. Please try again.');
    if (res.ok) reset({ reason: 'Help choosing a gift' });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2.5rem] border border-ink/10 bg-white/70 p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}><input {...register('name')} className="field" /></Field>
        <Field label="Email" error={errors.email?.message}><input {...register('email')} type="email" className="field" /></Field>
        <Field label="Order number optional" error={errors.orderNumber?.message}><input {...register('orderNumber')} className="field" /></Field>
        <Field label="Reason" error={errors.reason?.message}><select {...register('reason')} className="field"><option>Help choosing a gift</option><option>Custom order</option><option>Existing order</option><option>Wholesale / hospital donation</option><option>Other</option></select></Field>
      </div>
      <Field label="Message" error={errors.message?.message} className="mt-4"><textarea {...register('message')} className="field min-h-36" /></Field>
      <Button type="submit" className="mt-6">Send message</Button>
      {status && <p className="mt-4 text-sm font-semibold text-honeyDark">{status}</p>}
      <style jsx>{`.field{width:100%;border-radius:1rem;border:1px solid rgba(30,26,22,.1);background:#fff;padding:.9rem 1rem;outline:none}.field:focus{border-color:#c98f2c}`}</style>
    </form>
  );
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
