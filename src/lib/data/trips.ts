'use server'

import { createClient } from '@/lib/supabase/server'
import type { Trip, ItineraryDay, ItineraryItem } from '@/types'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

export async function createTrip(data: {
  title: string
  description?: string
  start_date: string
  end_date: string
  guest_count: number
  cover_image?: string
}): Promise<Trip> {
  const supabase = await createClient()
  const share_slug = `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${nanoid(6)}`

  const { data: trip, error } = await supabase
    .from('trips')
    .insert({
      ...data,
      share_slug,
      is_public: true,
    })
    .select()
    .single()

  if (error) throw error

  // Auto-create itinerary days for each date in the range
  const start = new Date(data.start_date)
  const end = new Date(data.end_date)
  const days = []
  let sortOrder = 0
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push({
      trip_id: trip.id,
      date: d.toISOString().split('T')[0],
      sort_order: sortOrder++,
    })
  }

  if (days.length > 0) {
    await supabase.from('itinerary_days').insert(days)
  }

  revalidatePath('/trips')
  return trip
}

export async function getPublicTrips(): Promise<Trip[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getTripBySlug(slug: string): Promise<Trip | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('share_slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getTripDays(tripId: string): Promise<ItineraryDay[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('itinerary_days')
    .select('*, park:parks(*), items:itinerary_items(*, attraction:attractions(*))')
    .eq('trip_id', tripId)
    .order('sort_order')
  if (error) throw error

  // Sort items within each day
  return (data || []).map(day => ({
    ...day,
    items: (day.items || []).sort((a: ItineraryItem, b: ItineraryItem) => a.sort_order - b.sort_order),
  }))
}

export async function updateDayPark(dayId: string, parkId: string | null): Promise<void> {
  const supabase = await createClient()
  await supabase.from('itinerary_days').update({ park_id: parkId }).eq('id', dayId)
}

export async function addItineraryItem(data: {
  day_id: string
  attraction_id?: string | null
  title: string
  start_time: string
  end_time?: string | null
  notes?: string | null
  type: string
  sort_order: number
}): Promise<ItineraryItem> {
  const supabase = await createClient()
  const { data: item, error } = await supabase
    .from('itinerary_items')
    .insert(data)
    .select('*, attraction:attractions(*)')
    .single()
  if (error) throw error
  return item
}

export async function removeItineraryItem(itemId: string): Promise<void> {
  const supabase = await createClient()
  await supabase.from('itinerary_items').delete().eq('id', itemId)
}

export async function updateTrip(tripId: string, data: Partial<Trip>): Promise<void> {
  const supabase = await createClient()
  await supabase.from('trips').update({ ...data, updated_at: new Date().toISOString() }).eq('id', tripId)
  revalidatePath('/trips')
}

export async function deleteTrip(tripId: string): Promise<void> {
  const supabase = await createClient()
  // Cascade will handle children
  await supabase.from('trips').delete().eq('id', tripId)
  revalidatePath('/trips')
}
