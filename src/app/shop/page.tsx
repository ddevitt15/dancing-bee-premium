import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopClient } from '@/components/shop/shop-client';

export const metadata: Metadata = {
  title: 'Shop Handmade Recovery Gifts & Keepsakes | Dancing Bee Designs',
  description: 'Browse handmade mastectomy recovery gifts, cancer care packages, port pillows, personalized ornaments, religious keepsakes, graduation gifts, and meaningful handmade items.'
};

export default function ShopPage() {
  return <Suspense><ShopClient /></Suspense>;
}
