import { NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/schemas';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const input = parsed.data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const orderNumber = `DBD-${Date.now().toString().slice(-8)}`;
  const supabase = getServiceSupabase();

  if (supabase) {
    await supabase.from('orders').insert({
      order_number: orderNumber,
      status: 'pending_payment',
      payment_status: 'pending',
      customer_email: input.email,
      customer_name: input.name,
      subtotal: input.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      total: input.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      shipping_address: { address1: input.address1, address2: input.address2, city: input.city, state: input.state, postalCode: input.postalCode, country: input.country },
      gift_message: input.giftMessage,
      is_gift: input.isGift
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: true, testMode: true, url: `/checkout/confirmation?mode=test&order=${orderNumber}` });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${siteUrl}/checkout/confirmation?order=${orderNumber}`,
    cancel_url: `${siteUrl}/checkout`,
    customer_email: input.email,
    metadata: { orderNumber, isGift: String(input.isGift), giftMessage: input.giftMessage ?? '' },
    line_items: input.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100),
        product_data: { name: item.title, images: item.image.startsWith('http') ? [item.image] : undefined, metadata: { productId: item.productId, slug: item.slug, variant: item.variant ?? '' } }
      }
    }))
  });

  return NextResponse.json({ ok: true, url: session.url });
}
