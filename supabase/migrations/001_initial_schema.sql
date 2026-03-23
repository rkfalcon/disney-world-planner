-- Parks table
CREATE TABLE parks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  map_url text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT '#6366f1'
);

-- Attractions table
CREATE TABLE attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  park_id uuid REFERENCES parks(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'ride',
  thrill_level integer NOT NULL DEFAULT 1,
  wait_time_avg integer NOT NULL DEFAULT 30,
  image_url text NOT NULL DEFAULT '',
  is_fastpass boolean NOT NULL DEFAULT false,
  location_lat double precision,
  location_lng double precision
);

-- Trips table
CREATE TABLE trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  cover_image text,
  is_public boolean NOT NULL DEFAULT true,
  share_slug text UNIQUE NOT NULL,
  guest_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Itinerary days
CREATE TABLE itinerary_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  park_id uuid REFERENCES parks(id) ON DELETE SET NULL,
  notes text,
  sort_order integer NOT NULL DEFAULT 0
);

-- Itinerary items
CREATE TABLE itinerary_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id uuid REFERENCES itinerary_days(id) ON DELETE CASCADE NOT NULL,
  attraction_id uuid REFERENCES attractions(id) ON DELETE SET NULL,
  title text NOT NULL,
  start_time time NOT NULL,
  end_time time,
  notes text,
  type text NOT NULL DEFAULT 'custom',
  sort_order integer NOT NULL DEFAULT 0
);

-- Dining reservations
CREATE TABLE dining_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  day_id uuid REFERENCES itinerary_days(id) ON DELETE SET NULL,
  restaurant_name text NOT NULL,
  park_id uuid REFERENCES parks(id) ON DELETE SET NULL,
  reservation_time timestamptz NOT NULL,
  party_size integer NOT NULL DEFAULT 2,
  confirmation_number text,
  notes text
);

-- Enable Row Level Security
ALTER TABLE parks ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_reservations ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON parks FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON attractions FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON trips FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON itinerary_days FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON itinerary_items FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON dining_reservations FOR SELECT TO anon USING (true);

-- Public write access for user-created tables (no auth in MVP)
CREATE POLICY "Public insert" ON trips FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update" ON trips FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete" ON trips FOR DELETE TO anon USING (true);

CREATE POLICY "Public insert" ON itinerary_days FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update" ON itinerary_days FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete" ON itinerary_days FOR DELETE TO anon USING (true);

CREATE POLICY "Public insert" ON itinerary_items FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update" ON itinerary_items FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete" ON itinerary_items FOR DELETE TO anon USING (true);

CREATE POLICY "Public insert" ON dining_reservations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update" ON dining_reservations FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete" ON dining_reservations FOR DELETE TO anon USING (true);
