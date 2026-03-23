import { Castle, Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Castle className="h-5 w-5 text-blue-600" />
              <span className="font-bold disney-gradient-text">Disney Planner</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plan your magical Walt Disney World vacation with our free trip planner.
              Create itineraries, explore parks, and share your plans.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/parks" className="hover:text-foreground transition-colors">Parks & Attractions</Link>
              <Link href="/trips" className="hover:text-foreground transition-colors">Public Trip Plans</Link>
              <Link href="/trips/new" className="hover:text-foreground transition-colors">Create a Plan</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Disney World Parks</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/parks/magic-kingdom" className="hover:text-foreground transition-colors">Magic Kingdom</Link>
              <Link href="/parks/epcot" className="hover:text-foreground transition-colors">EPCOT</Link>
              <Link href="/parks/hollywood-studios" className="hover:text-foreground transition-colors">Hollywood Studios</Link>
              <Link href="/parks/animal-kingdom" className="hover:text-foreground transition-colors">Animal Kingdom</Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Disney fans
          </p>
          <p>Not affiliated with The Walt Disney Company</p>
        </div>
      </div>
    </footer>
  )
}
