'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24', className)}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({ eyebrow, title, copy, align = 'center' }: { eyebrow?: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <div className={cn('mb-10 max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-honeyDark">{eyebrow}</p>}
      <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-ink/68 sm:text-lg">{copy}</p>}
    </div>
  );
}
