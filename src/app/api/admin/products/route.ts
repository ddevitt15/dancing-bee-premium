import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function GET() {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 501 });
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 501 });
  const body = await request.json();
  const { data, error } = await supabase.from('products').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}
