'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => setUnlocked(localStorage.getItem('dbd-admin-demo') === 'true'), []);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    // Demo fallback: replace this with Supabase Auth in production.
    if (password.length >= 6) {
      localStorage.setItem('dbd-admin-demo', 'true');
      setUnlocked(true);
    } else setError('Enter the demo password from .env.local or any 6+ chars while wiring Supabase Auth.');
  }
  if (!unlocked) {
    return <section className="mx-auto max-w-xl px-4 py-20"><form onSubmit={submit} className="rounded-[2.5rem] bg-white/70 p-8 shadow-soft"><p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Admin login</p><h1 className="font-serif text-4xl">Protected dashboard</h1><p className="mt-4 text-sm leading-7 text-ink/65">This is a backend-ready mock admin gate. Connect Supabase Auth before launch and use the `admins` table for role-based access.</p><input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Demo admin password" type="password" className="mt-6 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-honey" /><Button type="submit" className="mt-4 w-full">Unlock admin</Button>{error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}</form></section>;
  }
  return <>{children}</>;
}

export function AdminNav() {
  const links = [
    ['/admin', 'Overview'], ['/admin/products', 'Products'], ['/admin/orders', 'Orders'], ['/admin/reviews', 'Reviews'], ['/admin/homepage', 'Homepage'], ['/admin/coupons', 'Coupons'], ['/admin/subscribers', 'Subscribers']
  ];
  return <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">{links.map(([href, label]) => <Link key={href} href={href} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-linen">{label}</Link>)}</nav>;
}

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <AdminGate><section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">Dancing Bee Admin</p><h1 className="mb-8 font-serif text-5xl">{title}</h1><AdminNav />{children}</section></AdminGate>;
}
