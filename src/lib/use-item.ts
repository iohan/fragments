import { Note } from '@/types'
import { useState } from 'react'

const useItem = (initialItems: Note[]) => {
  const [selectedItem, setSelectedItem] = useState<Note | null>(null)
  const [items, setItems] = useState<Note[]>(initialItems)

  const changeItem = (changedItem: Note) => {
    if (!changedItem) {
      return
    }

    setItems((prev) =>
      prev.map((x) => {
        if (x.id === changedItem.id) {
          return { ...changedItem }
        }

        return x
      }),
    )

    setSelectedItem(changedItem)
  }

  const addItem = () => {
    const newItem = { id: new Date().getTime(), content: '', title: 'New note' }
    setItems((prev) => [...prev, newItem])
    setSelectedItem(newItem)
  }

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
    setSelectedItem(null)
  }

  return {
    items,
    selectedItem,
    selectItem: setSelectedItem,
    addItem,
    changeItem,
    deleteItem,
  }
}

export default useItem
