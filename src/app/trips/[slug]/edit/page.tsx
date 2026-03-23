'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Calendar, MapPin, Plus, Trash2, Clock, Zap, Utensils, Star, Share2, Check, Copy,
  Loader2, Eye
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatTime, attractionTypeLabel } from '@/lib/utils'
import { toast } from 'sonner'
import Link from 'next/link'
import type { Trip, ItineraryDay, ItineraryItem, Park, Attraction } from '@/types'

export default function EditTripPage() {
  const params = useParams()
  const slug = params.slug as string
  const supabase = createClient()

  const [trip, setTrip] = useState<Trip | null>(null)
  const [days, setDays] = useState<ItineraryDay[]>([])
  const [parks, setParks] = useState<Park[]>([])
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Add item dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedDayId, setSelectedDayId] = useState<string>('')
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'attraction' as string,
    start_time: '09:00',
    end_time: '10:00',
    notes: '',
    attraction_id: '' as string,
  })

  const loadData = useCallback(async () => {
    try {
      const [tripRes, parksRes, attractionsRes] = await Promise.all([
        supabase.from('trips').select('*').eq('share_slug', slug).single(),
        supabase.from('parks').select('*').order('name'),
        supabase.from('attractions').select('*, park:parks(*)').order('name'),
      ])

      if (tripRes.error || !tripRes.data) {
        toast.error('Trip not found')
        return
      }

      setTrip(tripRes.data)
      setParks(parksRes.data || [])
      setAttractions(attractionsRes.data || [])

      const daysRes = await supabase
        .from('itinerary_days')
        .select('*, park:parks(*), items:itinerary_items(*, attraction:attractions(*))')
        .eq('trip_id', tripRes.data.id)
        .order('sort_order')

      const sortedDays = (daysRes.data || []).map((day: any) => ({
        ...day,
        items: (day.items || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
      }))
      setDays(sortedDays)
    } catch {
      toast.error('Failed to load trip data')
    } finally {
      setLoading(false)
    }
  }, [slug, supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleParkChange(dayId: string, parkId: string) {
    await supabase.from('itinerary_days').update({ park_id: parkId === 'none' ? null : parkId }).eq('id', dayId)
    loadData()
  }

  async function handleAddItem() {
    if (!selectedDayId) return
    const day = days.find(d => d.id === selectedDayId)
    if (!day) return

    const itemData: any = {
      day_id: selectedDayId,
      title: newItem.title || (newItem.attraction_id ? 'Attraction' : 'Activity'),
      start_time: newItem.start_time,
      end_time: newItem.end_time || null,
      notes: newItem.notes || null,
      type: newItem.type,
      sort_order: (day.items?.length || 0),
      attraction_id: newItem.attraction_id || null,
    }

    // If attraction selected, use its name
    if (newItem.attraction_id) {
      const attraction = attractions.find(a => a.id === newItem.attraction_id)
      if (attraction) {
        itemData.title = attraction.name
      }
    }

    const { error } = await supabase.from('itinerary_items').insert(itemData)
    if (error) {
      toast.error('Failed to add item')
      return
    }

    toast.success('Item added!')
    setAddDialogOpen(false)
    setNewItem({ title: '', type: 'attraction', start_time: '09:00', end_time: '10:00', notes: '', attraction_id: '' })
    loadData()
  }

  async function handleRemoveItem(itemId: string) {
    await supabase.from('itinerary_items').delete().eq('id', itemId)
    toast.success('Item removed')
    loadData()
  }

  function copyShareLink() {
    const url = `${window.location.origin}/trips/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Share link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  function ItemTypeIcon({ type }: { type: string }) {
    switch (type) {
      case 'attraction': return <Zap className="h-4 w-4 text-blue-500" />
      case 'dining': return <Utensils className="h-4 w-4 text-orange-500" />
      case 'break': return <Clock className="h-4 w-4 text-green-500" />
      default: return <Star className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
        <Link href="/trips">
          <Button>Browse Trips</Button>
        </Link>
      </div>
    )
  }

  // Filter attractions by selected day's park
  const getFilteredAttractions = (dayId: string) => {
    const day = days.find(d => d.id === dayId)
    if (day?.park_id) {
      return attractions.filter(a => a.park_id === day.park_id)
    }
    return attractions
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{trip.title}</h1>
          <p className="text-muted-foreground">
            {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/trips/${slug}`}>
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button variant="outline" className="gap-2" onClick={copyShareLink}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Share Link'}
          </Button>
        </div>
      </div>

      {/* Day-by-day itinerary */}
      <div className="space-y-6">
        {days.map((day, index) => (
          <Card key={day.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">Day {index + 1}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatDate(day.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={day.park_id || 'none'}
                    onValueChange={(val) => handleParkChange(day.id, val ?? 'none')}
                  >
                    <SelectTrigger className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <SelectValue placeholder="Select park" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No park selected</SelectItem>
                      {parks.map(park => (
                        <SelectItem key={park.id} value={park.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: park.color }} />
                            {park.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Items list */}
              {day.items && day.items.length > 0 && (
                <div className="space-y-2 mb-4">
                  {day.items.map((item: ItineraryItem) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 group"
                    >
                      <ItemTypeIcon type={item.type} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {item.attraction?.name || item.title}
                          </span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {attractionTypeLabel(item.type)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(item.start_time)}
                          {item.end_time && ` — ${formatTime(item.end_time)}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add item button */}
              <Dialog open={addDialogOpen && selectedDayId === day.id} onOpenChange={(open) => {
                setAddDialogOpen(open)
                if (open) setSelectedDayId(day.id)
              }}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-dashed gap-2"
                    onClick={() => setSelectedDayId(day.id)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Activity to Day {index + 1}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newItem.type} onValueChange={(val) => setNewItem(prev => ({ ...prev, type: val, attraction_id: '' }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attraction">Attraction / Ride</SelectItem>
                          <SelectItem value="dining">Dining</SelectItem>
                          <SelectItem value="break">Break / Rest</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(newItem.type === 'attraction' || newItem.type === 'dining') && (
                      <div className="space-y-2">
                        <Label>Select Attraction</Label>
                        <Select value={newItem.attraction_id} onValueChange={(val) => setNewItem(prev => ({ ...prev, attraction_id: val }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an attraction..." />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {getFilteredAttractions(day.id)
                              .filter(a => newItem.type === 'dining' ? a.type === 'dining' : a.type !== 'dining')
                              .map(attraction => (
                                <SelectItem key={attraction.id} value={attraction.id}>
                                  {attraction.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {!newItem.attraction_id && (
                      <div className="space-y-2">
                        <Label>Activity Name</Label>
                        <Input
                          placeholder="e.g., Lunch at Be Our Guest"
                          value={newItem.title}
                          onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={newItem.start_time}
                          onChange={(e) => setNewItem(prev => ({ ...prev, start_time: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={newItem.end_time}
                          onChange={(e) => setNewItem(prev => ({ ...prev, end_time: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notes (optional)</Label>
                      <Input
                        placeholder="Any additional notes..."
                        value={newItem.notes}
                        onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddItem}>
                      Add to Itinerary
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
