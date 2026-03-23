import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, differenceInDays, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMM d, yyyy')
}

export function formatDateShort(date: string): string {
  return format(parseISO(date), 'MMM d')
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${minutes} ${ampm}`
}

export function getTripDuration(startDate: string, endDate: string): number {
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1
}

export function getParkColor(color: string): string {
  return color || '#6366f1'
}

export function thrillLevelLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'Gentle',
    2: 'Mild',
    3: 'Moderate',
    4: 'Thrilling',
    5: 'Intense',
  }
  return labels[level] || 'Unknown'
}

export function attractionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    ride: 'Ride',
    show: 'Show',
    dining: 'Dining',
    character_meet: 'Character Meet',
  }
  return labels[type] || type
}
