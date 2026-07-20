-- Collection name on artworks (e.g. August, Winter)

ALTER TABLE artworks
  ADD COLUMN IF NOT EXISTS collection_name TEXT;

CREATE INDEX IF NOT EXISTS idx_artworks_collection
  ON artworks (collection_name, release_year, release_month, release_day);
