-- Postcard customer fields for admin mailing list / filters
ALTER TABLE postcard_locations
  ADD COLUMN IF NOT EXISTS plan TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS shipping_line1 TEXT,
  ADD COLUMN IF NOT EXISTS shipping_line2 TEXT,
  ADD COLUMN IF NOT EXISTS shipping_city TEXT,
  ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT,
  ADD COLUMN IF NOT EXISTS shipping_state TEXT,
  ADD COLUMN IF NOT EXISTS shipping_country TEXT,
  ADD COLUMN IF NOT EXISTS period_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS period_end TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

-- Allow map geocode to fail without blocking customer / address storage
ALTER TABLE postcard_locations
  ALTER COLUMN lat DROP NOT NULL,
  ALTER COLUMN lng DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_postcard_locations_status
  ON postcard_locations (status);

CREATE INDEX IF NOT EXISTS idx_postcard_locations_plan
  ON postcard_locations (plan);

CREATE INDEX IF NOT EXISTS idx_postcard_locations_period_end
  ON postcard_locations (period_end);
