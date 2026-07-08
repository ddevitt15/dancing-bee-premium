'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  href?: string;
  children: ReactNode;
};

const styles = {
  primary: 'bg-ink text-ivory shadow-soft hover:bg-honeyDark',
  secondary: 'bg-white/80 text-ink border border-ink/10 hover:bg-white shadow-sm',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  dark: 'bg-honey text-ink shadow-glow hover:bg-[#dba34c]'
};

export function Button({
  className,
  variant = 'primary',
  href,
  children,
  ...props
}: ButtonProps) {
  const classNames = cn(
    'focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
    styles[variant],
    className
  );

  if (href) {
    return (
      <motion.span
        className="inline-flex"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link className={classNames} href={href}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span
      className="inline-flex"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <button className={classNames} {...props}>
        {children}
      </button>
    </motion.span>
  );
}
