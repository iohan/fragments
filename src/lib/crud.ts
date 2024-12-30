import { Note } from '@/types'

export const updateItem = (item: Note) => {
  return (items: Note[]) => {
    const mutatedItems: Note[] = [...items]

    return mutatedItems.map((x) => {
      if (x.id === item.id) {
        return { ...item }
      }
      return x
    })
  }
}

export const addItem = (items: Note[]): Note[] => {
  const newItem = { id: new Date().getTime(), content: '', title: 'New note' }
  return [...items, newItem]
}

export const deleteItem = (id: number) => {
  return (items: Note[]) => {
    const mutatedItems: Note[] = [...items]

    return mutatedItems.filter((x) => x.id !== id)
  }
}
