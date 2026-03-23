'use server'

import { createClient } from '@/lib/supabase/server'
import type { Park, Attraction } from '@/types'

export async function getParks(): Promise<Park[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('parks')
    .select('*')
    .order('name')
  if (error) throw error
  return data || []
}

export async function getParkBySlug(slug: string): Promise<Park | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('parks')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getAttractionsByPark(parkId: string): Promise<Attraction[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('park_id', parkId)
    .order('name')
  if (error) throw error
  return data || []
}

export async function getAllAttractions(): Promise<Attraction[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('attractions')
    .select('*, park:parks(*)')
    .order('name')
  if (error) throw error
  return data || []
}
