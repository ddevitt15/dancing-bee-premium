import type { Metadata } from 'next';
import { CheckoutClient } from '@/components/checkout/checkout-client';

export const metadata: Metadata = { title: 'Checkout | Dancing Bee Designs', description: 'Checkout for handmade recovery gifts and meaningful keepsakes from Dancing Bee Designs.' };
export default function CheckoutPage() { return <CheckoutClient />; }
