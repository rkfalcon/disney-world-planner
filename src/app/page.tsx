import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Castle, Map, Users, Share2, Sparkles, ArrowRight, Calendar, Star } from 'lucide-react'
import { getPublicTrips } from '@/lib/data/trips'
import { getParks } from '@/lib/data/parks'
import { formatDate, getTripDuration } from '@/lib/utils'

export default async function HomePage() {
  let trips: any[] = []
  let parks: any[] = []
  try {
    trips = await getPublicTrips()
    parks = await getParks()
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden disney-gradient py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              Free Disney World Trip Planner
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Plan Your Magical{' '}
              <span className="text-yellow-300">Disney World</span>{' '}
              Vacation
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Create beautiful day-by-day itineraries, explore all four parks,
              discover attractions, and share your plans with friends and family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips/new">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold gap-2 text-lg px-8">
                  <Castle className="h-5 w-5" />
                  Start Planning
                </Button>
              </Link>
              <Link href="/parks">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 text-lg px-8">
                  <Map className="h-5 w-5" />
                  Explore Parks
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Plan</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our trip planner makes it easy to create the perfect Disney World vacation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: 'Day-by-Day Itineraries', desc: 'Plan each day with timed activities, park assignments, and dining.' },
              { icon: Map, title: 'Explore All 4 Parks', desc: 'Browse attractions, shows, dining, and character meets for every park.' },
              { icon: Star, title: 'Attraction Details', desc: 'View wait times, thrill levels, Lightning Lane availability, and more.' },
              { icon: Share2, title: 'Share Your Plans', desc: 'Get a unique link to share your trip with friends, family, or anyone.' },
            ].map((feature) => (
              <Card key={feature.title} className="text-center park-card-hover border-0 shadow-md">
                <CardContent className="pt-8 pb-6">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parks Preview */}
      {parks.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Walt Disney World Parks</h2>
                <p className="text-muted-foreground">Explore all four magical theme parks</p>
              </div>
              <Link href="/parks">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {parks.map((park: any) => (
                <Link key={park.id} href={`/parks/${park.slug}`}>
                  <Card className="overflow-hidden park-card-hover cursor-pointer group">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: park.image_url ? `url(${park.image_url})` : undefined,
                          backgroundColor: park.color,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-lg">{park.name}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Public Trips */}
      {trips.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recent Trip Plans</h2>
                <p className="text-muted-foreground">See what other Disney fans are planning</p>
              </div>
              <Link href="/trips">
                <Button variant="outline" className="gap-2">
                  Browse All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.slice(0, 6).map((trip: any) => (
                <Link key={trip.id} href={`/trips/${trip.share_slug}`}>
                  <Card className="overflow-hidden park-card-hover cursor-pointer">
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
                        <p className="text-white/70 text-sm">
                          {formatDate(trip.start_date)} — {getTripDuration(trip.start_date, trip.end_date)} days
                        </p>
                      </div>
                    </div>
                    <CardContent className="py-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {trip.guest_count} guests
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {getTripDuration(trip.start_date, trip.end_date)} days
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 disney-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Plan Your Magic?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Start creating your perfect Disney World itinerary today. It's free!
          </p>
          <Link href="/trips/new">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold gap-2 text-lg px-8">
              <Castle className="h-5 w-5" />
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
