import { Item } from '../types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { recurseFind } from './recurse-find'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findItemById = (id: number | null) => (items: Item[]) =>
  id
    ? recurseFind<Item>('children', (item) => item.id === id)(items)
    : undefined
