import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Enter a valid email address')
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  orderNumber: z.string().optional(),
  reason: z.enum(['Help choosing a gift', 'Custom order', 'Existing order', 'Wholesale / hospital donation', 'Other']),
  message: z.string().min(10, 'Please include a few details')
});

export const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().optional(),
  address1: z.string().min(4),
  address2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(4),
  country: z.string().default('US'),
  isGift: z.boolean().default(false),
  recipientName: z.string().optional(),
  giftMessage: z.string().max(500).optional(),
  items: z.array(z.object({
    productId: z.string(),
    slug: z.string(),
    title: z.string(),
    price: z.number(),
    image: z.string(),
    quantity: z.number().min(1),
    variant: z.string().optional(),
    giftNote: z.string().optional()
  })).min(1)
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
