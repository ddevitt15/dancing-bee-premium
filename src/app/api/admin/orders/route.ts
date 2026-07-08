import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function GET() {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 501 });
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}

export async function PATCH(request: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 501 });
  const { id, status } = await request.json();
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ order: data });
}
