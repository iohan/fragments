import { Note } from '@/types'
import { useState } from 'react'

const useItem = (initialItems: Note[]) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [items, setItems] = useState<Note[]>(initialItems)

  const changeItem = (changedItem: { id: number } & Partial<Note>) => {
    if (!changedItem) {
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === changedItem.id
          ? {
              ...item,
              title: changedItem.title || item.title,
              content: changedItem.content || item.content,
            }
          : item,
      ),
    )
  }

  const addItem = () => {
    const newItem = { id: new Date().getTime(), content: '', title: 'New note' }
    setItems((prev) => [...prev, newItem])
    setSelectedItem(newItem.id)
  }

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
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
