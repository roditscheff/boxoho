-- BOXOHO Phase 2: artworks, registrations, postcard map points
-- Run in Supabase SQL Editor

-- Artworks catalog (admin-managed)
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL UNIQUE,
  title TEXT,
  image_path TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artworks_number ON artworks (number);

-- Collector registration for an artwork (one per artwork)
CREATE TABLE IF NOT EXISTS artwork_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID NOT NULL UNIQUE REFERENCES artworks (id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  place_text TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  public_lat DOUBLE PRECISION,
  public_lng DOUBLE PRECISION,
  map_consent BOOLEAN NOT NULL DEFAULT FALSE,
  home_photo_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artwork_registrations_consent
  ON artwork_registrations (map_consent)
  WHERE map_consent = TRUE;

-- Optional postcard homes (filled later via Stripe / checkout)
CREATE TABLE IF NOT EXISTS postcard_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  place_text TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  public_lat DOUBLE PRECISION,
  public_lng DOUBLE PRECISION,
  map_consent BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_postcard_locations_consent
  ON postcard_locations (map_consent)
  WHERE map_consent = TRUE;

-- RLS: no direct public table access; app uses service role in API routes
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE postcard_locations ENABLE ROW LEVEL SECURITY;

-- Storage buckets (run once; ignore error if they already exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('registration-photos', 'registration-photos', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Public read for artwork images
CREATE POLICY "Public read artworks bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'artworks');

CREATE POLICY "Public read registration photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'registration-photos');
