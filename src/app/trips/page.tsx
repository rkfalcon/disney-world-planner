import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPublicTrips } from '@/lib/data/trips'
import { Castle, Users, Calendar, Compass } from 'lucide-react'
import { formatDate, getTripDuration } from '@/lib/utils'
import type { Trip } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Public Trip Plans',
  description: 'Browse trip plans shared by other Disney World visitors.',
}

export default async function TripsPage() {
  let trips: Trip[] = []
  try {
    trips = await getPublicTrips()
  } catch {
    // DB not connected
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Trip Plans</h1>
          <p className="text-muted-foreground text-lg">
            Browse public trip plans or create your own magical itinerary.
          </p>
        </div>
        <Link href="/trips/new">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Castle className="h-4 w-4" />
            Create Trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20">
          <Compass className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
          <p className="text-muted-foreground mb-6">Be the first to create and share a Disney World trip plan!</p>
          <Link href="/trips/new">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Castle className="h-4 w-4" />
              Plan Your Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.share_slug}`}>
              <Card className="overflow-hidden park-card-hover cursor-pointer h-full">
                <div className="aspect-[16/9] relative" style={{ backgroundColor: '#1e3a5f' }}>
                  {trip.cover_image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${trip.cover_image})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg">{trip.title}</h3>
                  </div>
                </div>
                <CardContent className="py-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(trip.start_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {trip.guest_count} guests
                    </span>
                    <span>{getTripDuration(trip.start_date, trip.end_date)} days</span>
                  </div>
                  {trip.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{trip.description}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
