import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/components/cart/cart-provider';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { organizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Dancing Bee Designs | Handmade Recovery Gifts & Meaningful Keepsakes',
  description: 'Shop handmade recovery care packages, port pillows, mastectomy gifts, personalized ornaments, religious keepsakes, and meaningful gifts crafted with care.',
  openGraph: {
    title: 'Dancing Bee Designs | Handmade Recovery Gifts & Meaningful Keepsakes',
    description: 'Handmade recovery gifts, care packages, port pillows, keepsakes, and personalized comfort items.',
    type: 'website'
  }
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fbf5ea' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
