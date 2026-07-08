export type CollectionSlug =
  | 'mastectomy-recovery-gifts'
  | 'cancer-care-packages'
  | 'port-pillows'
  | 'recovery-pillows'
  | 'drain-holders'
  | 'personalized-ornaments'
  | 'religious-keepsakes'
  | 'graduation-gifts'
  | 'handmade-gifts'
  | 'craft-tools-patterns';

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  category: CollectionSlug;
  collections: CollectionSlug[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  bestseller?: boolean;
  giftable?: boolean;
  donationEligible?: boolean;
  freeShipping?: boolean;
  tags: string[];
  variants?: { name: string; values: string[] }[];
  details: string[];
  seoKeywords: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  giftNote?: string;
};

export type Review = {
  name: string;
  date: string;
  rating: number;
  excerpt: string;
  product: string;
};
