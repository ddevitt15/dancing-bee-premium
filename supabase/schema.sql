-- Dancing Bee Designs Supabase schema
create extension if not exists "uuid-ossp";

create table if not exists collections (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  description text,
  seo_title text,
  seo_description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  long_description text,
  price numeric(10,2) not null,
  compare_at numeric(10,2),
  status text default 'active' check (status in ('draft','active','archived')),
  featured boolean default false,
  bestseller boolean default false,
  donation_eligible boolean default false,
  free_shipping boolean default false,
  inventory int default 999,
  image_url text,
  tags text[] default '{}',
  seo_keywords text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  alt text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  name text not null,
  options jsonb not null default '[]',
  price_delta numeric(10,2) default 0,
  created_at timestamptz default now()
);

create table if not exists product_collections (
  product_id uuid references products(id) on delete cascade,
  collection_id uuid references collections(id) on delete cascade,
  primary key (product_id, collection_id)
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists carts (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id),
  session_id text,
  gift_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null default 1,
  variant text,
  gift_note text,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_id uuid references customers(id),
  customer_email text not null,
  customer_name text,
  status text default 'pending_payment' check (status in ('pending_payment','paid','in_production','shipped','cancelled','refunded','in_review')),
  payment_status text default 'pending',
  stripe_session_id text,
  subtotal numeric(10,2) not null default 0,
  discount_total numeric(10,2) default 0,
  shipping_total numeric(10,2) default 0,
  tax_total numeric(10,2) default 0,
  total numeric(10,2) not null default 0,
  is_gift boolean default false,
  gift_message text,
  shipping_address jsonb,
  billing_address jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  title text not null,
  quantity int not null,
  unit_price numeric(10,2) not null,
  variant text,
  gift_note text,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete set null,
  source text default 'etsy',
  reviewer_name text,
  rating int check (rating between 1 and 5),
  excerpt text,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percent','fixed')),
  discount_value numeric(10,2) not null,
  active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions int,
  created_at timestamptz default now()
);

create table if not exists email_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  source text default 'homepage',
  consent boolean default true,
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  order_number text,
  reason text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists homepage_sections (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  title text,
  copy text,
  data jsonb default '{}',
  enabled boolean default true,
  updated_at timestamptz default now()
);

create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null default 'manager' check (role in ('owner','manager','viewer')),
  created_at timestamptz default now()
);

alter table collections enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table product_collections enable row level security;
alter table customers enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;
alter table coupons enable row level security;
alter table email_subscribers enable row level security;
alter table contact_messages enable row level security;
alter table homepage_sections enable row level security;
alter table admins enable row level security;

create or replace function is_admin()
returns boolean language sql stable security definer as $$
  select exists(select 1 from admins where user_id = auth.uid());
$$;

create policy "public read active collections" on collections for select using (true);
create policy "public read active products" on products for select using (status = 'active');
create policy "public read product images" on product_images for select using (true);
create policy "public read product variants" on product_variants for select using (true);
create policy "public read product collections" on product_collections for select using (true);
create policy "public read published reviews" on reviews for select using (published = true);
create policy "public read homepage sections" on homepage_sections for select using (enabled = true);

create policy "insert subscribers" on email_subscribers for insert with check (true);
create policy "insert contact messages" on contact_messages for insert with check (true);
create policy "insert customers" on customers for insert with check (true);
create policy "insert carts" on carts for insert with check (true);
create policy "insert cart items" on cart_items for insert with check (true);
create policy "insert orders" on orders for insert with check (true);
create policy "insert order items" on order_items for insert with check (true);

create policy "admins manage collections" on collections for all using (is_admin()) with check (is_admin());
create policy "admins manage products" on products for all using (is_admin()) with check (is_admin());
create policy "admins manage product images" on product_images for all using (is_admin()) with check (is_admin());
create policy "admins manage product variants" on product_variants for all using (is_admin()) with check (is_admin());
create policy "admins manage product collections" on product_collections for all using (is_admin()) with check (is_admin());
create policy "admins manage customers" on customers for all using (is_admin()) with check (is_admin());
create policy "admins manage orders" on orders for all using (is_admin()) with check (is_admin());
create policy "admins manage order items" on order_items for all using (is_admin()) with check (is_admin());
create policy "admins manage reviews" on reviews for all using (is_admin()) with check (is_admin());
create policy "admins manage coupons" on coupons for all using (is_admin()) with check (is_admin());
create policy "admins manage subscribers" on email_subscribers for all using (is_admin()) with check (is_admin());
create policy "admins manage contact messages" on contact_messages for all using (is_admin()) with check (is_admin());
create policy "admins manage homepage" on homepage_sections for all using (is_admin()) with check (is_admin());
create policy "admins read admins" on admins for select using (is_admin());
