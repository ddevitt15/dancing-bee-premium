# Dancing Bee Designs — Premium Ecommerce Website

A full Next.js App Router ecommerce build for Dancing Bee Designs: premium animated homepage, product catalog, recovery-gifts landing page, product detail template, cart drawer, checkout flow, admin dashboard, Supabase schema, Stripe-ready checkout, contact/email capture routes, and SEO/schema markup.

## What is included

- Next.js + TypeScript + Tailwind CSS
- Framer Motion scroll animations and microinteractions
- Mobile-first responsive ecommerce UI
- Cart drawer with add-ons, quantity controls, gift note support
- Shop page with search, category filters, price filters, sorting, quick view
- Product detail page with gallery, variants, sticky purchase panel, FAQs, upsells
- Recovery gifts SEO landing page
- Contact and About pages
- Admin dashboard routes for products, orders, reviews, homepage, coupons, subscribers
- Supabase-ready schema, seed file, and RLS policies
- Stripe Checkout-ready API route with test fallback when keys are missing
- Product, FAQ, organization, and breadcrumb structured data

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to add initial collections, products, reviews, and homepage content.
4. Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

5. Create at least one user in Supabase Auth.
6. Insert that user's id into the `admins` table:

```sql
insert into admins (user_id, role) values ('USER_UUID_HERE', 'owner');
```

The UI includes a protected/mock admin experience. With Supabase Auth connected, use the admin RLS policies and replace the demo password step with a real login page.

## Stripe setup

1. Create Stripe products/prices or use line items generated from cart data.
2. Add keys to `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. Checkout route: `src/app/api/checkout/route.ts`
4. If `STRIPE_SECRET_KEY` is missing, checkout still works as a local test flow and redirects to `/checkout/confirmation` with a pending test order.

## Deployment on Vercel

1. Push this folder to GitHub.
2. Import it into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Real product data note

Initial seed data uses product names, categories, prices, and verified details from the public Dancing Bee Designs website/Etsy pages where available. Replace placeholder/local images and any draft product copy before launch if the shop owner wants exact current inventory synced from Etsy.

## Key routes

- `/` homepage
- `/shop` full catalog
- `/recovery-gifts` SEO landing page
- `/products/deluxe-mastectomy-recovery-gift-set` product detail template
- `/checkout` checkout form
- `/checkout/confirmation` confirmation
- `/about` about page
- `/contact` contact page
- `/admin` dashboard
- `/admin/products`, `/admin/orders`, `/admin/reviews`, `/admin/homepage`, `/admin/coupons`, `/admin/subscribers`

## Launch checklist

- Replace demo admin password with Supabase Auth login.
- Confirm all product prices and current inventory.
- Add production Stripe keys.
- Add production Supabase keys.
- Add email provider keys.
- Configure Vercel domain.
- Test checkout in Stripe test mode.
- Test mobile cart, product page, contact, and subscribe forms.
