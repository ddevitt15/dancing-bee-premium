import { siteUrl } from '@/lib/utils';
import type { Product } from '@/types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dancing Bee Designs',
    url: siteUrl,
    sameAs: ['https://www.etsy.com/shop/DancingBeeDesigns', 'https://www.instagram.com/dancingbeedesignsllc/'],
    address: { '@type': 'PostalAddress', addressLocality: 'Raleigh', addressRegion: 'NC', addressCountry: 'US' },
    description: 'Handmade recovery gifts, care packages, port pillows, keepsakes, ornaments, and personalized gifts.'
  };
}

export function productSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.gallery,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Dancing Bee Designs' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/products/${product.slug}`
    },
    aggregateRating: product.rating ? { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount ?? 1 } : undefined
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url }))
  };
}
