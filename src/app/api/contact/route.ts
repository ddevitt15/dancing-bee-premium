import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const supabase = getServiceSupabase();
  if (supabase) {
    await supabase.from('contact_messages').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      order_number: parsed.data.orderNumber,
      reason: parsed.data.reason,
      message: parsed.data.message
    });
  }
  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
