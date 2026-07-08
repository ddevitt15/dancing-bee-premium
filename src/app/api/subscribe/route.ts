import { NextResponse } from 'next/server';
import { emailSchema } from '@/lib/schemas';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const parsed = emailSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const supabase = getServiceSupabase();
  if (supabase) {
    await supabase.from('email_subscribers').upsert({ email: parsed.data.email, source: 'homepage' }, { onConflict: 'email' });
  }
  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
