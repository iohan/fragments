import { Item } from '@/types'

type Select = { item: number | null; set: (id: number) => void }
export interface FileTreeProps {
  items: Item[]
  select: Select
}
export interface FileNodeProps {
  item: Item
  index: number
  select: Select
}
