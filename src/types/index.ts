export interface Park {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  map_url: string
  color: string
}

export interface Attraction {
  id: string
  park_id: string
  name: string
  description: string
  type: 'ride' | 'show' | 'dining' | 'character_meet'
  thrill_level: number
  wait_time_avg: number
  image_url: string
  is_fastpass: boolean
  location_lat: number
  location_lng: number
  park?: Park
}

export interface Trip {
  id: string
  title: string
  description: string | null
  start_date: string
  end_date: string
  cover_image: string | null
  is_public: boolean
  share_slug: string
  guest_count: number
  created_at: string
  updated_at: string
}

export interface ItineraryDay {
  id: string
  trip_id: string
  date: string
  park_id: string | null
  notes: string | null
  sort_order: number
  park?: Park | null
  items?: ItineraryItem[]
}

export interface ItineraryItem {
  id: string
  day_id: string
  attraction_id: string | null
  title: string
  start_time: string
  end_time: string | null
  notes: string | null
  type: 'attraction' | 'dining' | 'break' | 'travel' | 'custom'
  sort_order: number
  attraction?: Attraction | null
}

export interface DiningReservation {
  id: string
  trip_id: string
  day_id: string | null
  restaurant_name: string
  park_id: string | null
  reservation_time: string
  party_size: number
  confirmation_number: string | null
  notes: string | null
}
