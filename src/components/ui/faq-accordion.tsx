'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white/55 shadow-soft backdrop-blur">
      {items.map((item, index) => (
        <div key={item.question} className="border-b border-ink/10 last:border-b-0">
          <button className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="font-semibold text-ink">{item.question}</span>
            <motion.span animate={{ rotate: open === index ? 45 : 0 }}><Plus className="h-5 w-5 text-honeyDark" /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-7 text-ink/68">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
