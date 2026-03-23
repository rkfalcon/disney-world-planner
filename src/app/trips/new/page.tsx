'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Castle, Loader2, Users, Minus, Plus } from 'lucide-react'
import { createTrip } from '@/lib/data/trips'
import { toast } from 'sonner'

export default function NewTripPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [guestCount, setGuestCount] = useState(2)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    cover_image: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.start_date || !formData.end_date) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      const trip = await createTrip({
        ...formData,
        guest_count: guestCount,
        description: formData.description || undefined,
        cover_image: formData.cover_image || undefined,
      })
      toast.success('Trip created! Redirecting to your planner...')
      router.push(`/trips/${trip.share_slug}/edit`)
    } catch (err) {
      toast.error('Failed to create trip. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Castle className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold mb-2">Plan Your Disney Trip</h1>
          <p className="text-muted-foreground">
            Fill in the details below to start building your magical itinerary.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>Tell us about your upcoming Disney World adventure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Name *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Smith Family Disney Vacation 2026"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any notes about your trip..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date *</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    required
                    min={formData.start_date}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2 min-w-[80px] justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg font-semibold">{guestCount}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_image">Cover Image URL (optional)</Label>
                <Input
                  id="cover_image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.cover_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  <>
                    <Castle className="h-4 w-4" />
                    Create Trip & Start Planning
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
