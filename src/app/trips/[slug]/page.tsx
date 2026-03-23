import { notFound } from 'next/navigation'
import { getTripBySlug, getTripDays } from '@/lib/data/trips'
import { getParks } from '@/lib/data/parks'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Users, Clock, MapPin, Share2, Pencil, Utensils, Zap, Star } from 'lucide-react'
import { formatDate, formatDateShort, formatTime, getTripDuration, attractionTypeLabel } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ItineraryItem } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trip = await getTripBySlug(slug)
  if (!trip) return { title: 'Trip Not Found' }
  return {
    title: trip.title,
    description: trip.description || `A ${getTripDuration(trip.start_date, trip.end_date)}-day Disney World trip plan`,
    openGraph: {
      title: trip.title,
      description: trip.description || `A ${getTripDuration(trip.start_date, trip.end_date)}-day Disney World trip plan`,
    },
  }
}

function ItemTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'attraction': return <Zap className="h-4 w-4 text-blue-500" />
    case 'dining': return <Utensils className="h-4 w-4 text-orange-500" />
    case 'break': return <Clock className="h-4 w-4 text-green-500" />
    case 'travel': return <MapPin className="h-4 w-4 text-purple-500" />
    default: return <Star className="h-4 w-4 text-gray-500" />
  }
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params
  const trip = await getTripBySlug(slug)
  if (!trip) notFound()

  const days = await getTripDays(trip.id)
  const duration = getTripDuration(trip.start_date, trip.end_date)

  return (
    <div>
      {/* Trip Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: trip.cover_image ? `url(${trip.cover_image})` : undefined,
            backgroundColor: '#1e3a5f',
          }}
        />
        <div className="absolute inset-0 disney-gradient opacity-80" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{trip.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {duration} days
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {trip.guest_count} guests
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{trip.description || 'A magical Disney World adventure'}</p>
          <div className="flex gap-2">
            <Link href={`/trips/${slug}/edit`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={undefined}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

        {days.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No itinerary days yet.</p>
            <Link href={`/trips/${slug}/edit`}>
              <Button variant="link" className="text-blue-600">Start building your itinerary</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {days.map((day, index) => (
              <Card key={day.id}>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">Day {index + 1}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(day.date)}</p>
                      </div>
                    </div>
                    {day.park && (
                      <Badge
                        variant="secondary"
                        className="gap-1.5"
                        style={{ backgroundColor: `${day.park.color}20`, color: day.park.color }}
                      >
                        <MapPin className="h-3 w-3" />
                        {day.park.name}
                      </Badge>
                    )}
                  </div>

                  {day.items && day.items.length > 0 ? (
                    <div className="space-y-3 ml-[52px]">
                      {day.items.map((item: ItineraryItem) => (
                        <div key={item.id} className="flex items-start gap-3 group">
                          <div className="mt-0.5">
                            <ItemTypeIcon type={item.type} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {item.attraction?.name || item.title}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {attractionTypeLabel(item.type)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(item.start_time)}
                              {item.end_time && ` — ${formatTime(item.end_time)}`}
                            </p>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground ml-[52px]">No activities planned yet.</p>
                  )}

                  {day.notes && (
                    <>
                      <Separator className="my-3" />
                      <p className="text-sm text-muted-foreground ml-[52px]">{day.notes}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
