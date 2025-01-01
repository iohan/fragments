import { Item } from '../types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findItemById = (id: number | null) => (items: Item[]) =>
  id ? items.find((item) => item.id === id) : undefined
