import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getParks } from '@/lib/data/parks'
import { MapPin, ArrowRight } from 'lucide-react'
import type { Park } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parks & Attractions',
  description: 'Explore all four Walt Disney World theme parks - Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom.',
}

export default async function ParksPage() {
  let parks: Park[] = []
  try {
    parks = await getParks()
  } catch {
    // DB not connected
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Walt Disney World Parks</h1>
        <p className="text-lg text-muted-foreground">
          Explore all four magical theme parks and discover rides, shows, dining, and more.
        </p>
      </div>

      {parks.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Parks data not available yet. Please connect Supabase and run the seed data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {parks.map((park) => (
            <Link key={park.id} href={`/parks/${park.slug}`}>
              <Card className="overflow-hidden park-card-hover cursor-pointer group h-full">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: park.image_url ? `url(${park.image_url})` : undefined,
                      backgroundColor: park.color,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{park.name}</h2>
                  </div>
                </div>
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{park.description}</p>
                  <div className="flex items-center text-sm font-medium text-blue-600 gap-1">
                    Explore Park <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
