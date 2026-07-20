-- Anonymous public display + collection calendar fields on artworks

ALTER TABLE artwork_registrations
  ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE artworks
  ADD COLUMN IF NOT EXISTS release_year INTEGER,
  ADD COLUMN IF NOT EXISTS release_month INTEGER,
  ADD COLUMN IF NOT EXISTS release_day INTEGER;

CREATE INDEX IF NOT EXISTS idx_artworks_release
  ON artworks (release_year, release_month, release_day);
