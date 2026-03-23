import { notFound } from 'next/navigation'
import { getParkBySlug, getAttractionsByPark } from '@/lib/data/parks'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Zap, Star, Utensils, Theater, Users } from 'lucide-react'
import { thrillLevelLabel, attractionTypeLabel } from '@/lib/utils'
import type { Attraction } from '@/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const park = await getParkBySlug(slug)
  if (!park) return { title: 'Park Not Found' }
  return {
    title: park.name,
    description: park.description,
  }
}

function AttractionTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'ride': return <Zap className="h-4 w-4" />
    case 'show': return <Theater className="h-4 w-4" />
    case 'dining': return <Utensils className="h-4 w-4" />
    case 'character_meet': return <Users className="h-4 w-4" />
    default: return <Star className="h-4 w-4" />
  }
}

function thrillColor(level: number): string {
  if (level <= 1) return 'bg-green-100 text-green-800'
  if (level <= 2) return 'bg-blue-100 text-blue-800'
  if (level <= 3) return 'bg-yellow-100 text-yellow-800'
  if (level <= 4) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

export default async function ParkDetailPage({ params }: Props) {
  const { slug } = await params
  const park = await getParkBySlug(slug)
  if (!park) notFound()

  const attractions = await getAttractionsByPark(park.id)

  const rides = attractions.filter((a: Attraction) => a.type === 'ride')
  const shows = attractions.filter((a: Attraction) => a.type === 'show')
  const dining = attractions.filter((a: Attraction) => a.type === 'dining')
  const characters = attractions.filter((a: Attraction) => a.type === 'character_meet')

  function AttractionGrid({ items }: { items: Attraction[] }) {
    if (items.length === 0) return <p className="text-muted-foreground text-center py-8">No items in this category.</p>
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((attraction) => (
          <Card key={attraction.id} className="park-card-hover">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold leading-tight">{attraction.name}</h3>
                <AttractionTypeIcon type={attraction.type} />
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{attraction.description}</p>
              <div className="flex flex-wrap gap-2">
                {attraction.type === 'ride' && (
                  <Badge variant="secondary" className={thrillColor(attraction.thrill_level)}>
                    {thrillLevelLabel(attraction.thrill_level)}
                  </Badge>
                )}
                {attraction.wait_time_avg > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    ~{attraction.wait_time_avg} min
                  </Badge>
                )}
                {attraction.is_fastpass && (
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    <Zap className="h-3 w-3 mr-1" />
                    LL
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Park Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: park.image_url ? `url(${park.image_url})` : undefined,
            backgroundColor: park.color,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{park.name}</h1>
            <p className="text-white/80 text-lg max-w-2xl">{park.description}</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-6 text-sm">
          <span className="font-medium">{rides.length} Rides</span>
          <span className="font-medium">{shows.length} Shows & Experiences</span>
          <span className="font-medium">{dining.length} Dining</span>
          <span className="font-medium">{characters.length} Character Meets</span>
          <span className="font-medium">{attractions.length} Total Attractions</span>
        </div>
      </div>

      {/* Attractions */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rides" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="rides">Rides ({rides.length})</TabsTrigger>
            <TabsTrigger value="shows">Shows ({shows.length})</TabsTrigger>
            <TabsTrigger value="dining">Dining ({dining.length})</TabsTrigger>
            <TabsTrigger value="characters">Characters ({characters.length})</TabsTrigger>
            <TabsTrigger value="all">All ({attractions.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="rides"><AttractionGrid items={rides} /></TabsContent>
          <TabsContent value="shows"><AttractionGrid items={shows} /></TabsContent>
          <TabsContent value="dining"><AttractionGrid items={dining} /></TabsContent>
          <TabsContent value="characters"><AttractionGrid items={characters} /></TabsContent>
          <TabsContent value="all"><AttractionGrid items={attractions} /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
