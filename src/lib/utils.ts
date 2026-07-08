import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function slugToTitle(slug: string) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
