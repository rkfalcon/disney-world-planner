'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Castle, Map, Compass, Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/parks', label: 'Parks', icon: Map },
  { href: '/trips', label: 'Trips', icon: Compass },
  { href: '/trips/new', label: 'Plan a Trip', icon: Castle },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Castle className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">
            <span className="disney-gradient-text">Disney Planner</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'gap-2',
                    isActive && 'bg-blue-600 hover:bg-blue-700'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-2 mt-8">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start gap-3',
                        isActive && 'bg-blue-600'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
