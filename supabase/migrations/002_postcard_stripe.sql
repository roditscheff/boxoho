-- Optional fields for Stripe postcard subscriptions
ALTER TABLE postcard_locations
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS shipping_name TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_postcard_locations_customer
  ON postcard_locations (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
