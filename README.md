# BOXOHO Website

One-pager for Tiny Art Surprises and Mürren postcards — with collectors map & registration.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS 4
- EN/DE i18n
- Supabase (DB + Storage) — Phase 2
- MapLibre (collectors map)
- Stripe — Phase 3 (code ready; needs keys)

## Local

```bash
cp .env.example .env.local
# fill Supabase + ADMIN_PASSWORD
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) · Admin: `/en/admin`

## Supabase setup

1. Create a project on [supabase.com](https://supabase.com)
2. SQL Editor → run `supabase/migrations/001_initial.sql`
3. Copy Project URL, anon key, service role key into `.env.local`
4. Set `ADMIN_PASSWORD`
5. In Admin: upload artworks (number + image)

## Stripe setup (Phase 3)

1. Create products in [Stripe Dashboard](https://dashboard.stripe.com) (test mode first):
   - **Monthly:** recurring subscription · CHF 9.00 / month → `STRIPE_PRICE_MONTHLY`
   - **Yearly:** one-time payment · CHF 90.00 (not recurring) → `STRIPE_PRICE_YEARLY`  
     Description idea: *A new postcard from Mürren every month for a year — 12 cards, 12 stories, paid once, delivered all year. Sent by standard mail, not tracked.*
2. Developers → API keys → `STRIPE_SECRET_KEY`
3. Developers → Webhooks → Add endpoint  
   - URL (local via Stripe CLI): `http://127.0.0.1:3000/api/stripe/webhook`  
   - Event: `checkout.session.completed`  
   - Secret → `STRIPE_WEBHOOK_SECRET`
4. Run SQL: `supabase/migrations/001_initial.sql`, then `002_postcard_stripe.sql`, then `003_postcard_customers.sql`
5. Customer Portal: Settings → Billing → Customer portal → enable cancellation
6. Webhook events (Live): `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

Local webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Phase status

| Phase | Status |
|-------|--------|
| 1 Marketing one-pager | Done |
| 2 Registration + map + admin | Done |
| 3 Postcard Stripe checkout | Done in code — add Stripe keys + SQL 002 |
| 4 Social feed / email polish | Later |
