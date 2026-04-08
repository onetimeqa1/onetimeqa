-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  service_type    TEXT NOT NULL CHECK (service_type IN ('photobooth', 'instax')),
  package_id      TEXT NOT NULL,
  package_name    TEXT NOT NULL,
  event_date      DATE NOT NULL,
  event_time      TIME NOT NULL,
  event_location  TEXT NOT NULL,
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  extra_hours     INTEGER NOT NULL DEFAULT 0,
  extra_photos    INTEGER NOT NULL DEFAULT 0,
  add_custom_card BOOLEAN NOT NULL DEFAULT FALSE,
  card_qty_tall   INTEGER NOT NULL DEFAULT 0,
  card_qty_big    INTEGER NOT NULL DEFAULT 0,
  total_cards     INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_service_date ON bookings (service_type, event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings (created_at DESC);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read booking dates"
  ON bookings FOR SELECT TO anon USING (true);

CREATE POLICY "Service role can insert"
  ON bookings FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update"
  ON bookings FOR UPDATE TO service_role USING (true);
