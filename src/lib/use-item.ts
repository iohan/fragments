import { isNote, Item } from '../types'
import { useState } from 'react'

const useItem = (initialItems: Item[]) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [items, setItems] = useState<Item[]>(initialItems)

  const changeItem = (item: { id: number } & Partial<Item>) => {
    if (!item) {
      return
    }

    if (item.title) {
      updateTitleOfItem(item.id, item.title)
    }

    if (isNote(item) && item.content) {
      updateContentOfNote(item.id, item.content)
    }
  }

  const updateTitleOfItem = (id: number, title: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title } : item)),
    )
  }

  const updateContentOfNote = (id: number, content: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && isNote(item) ? { ...item, content } : item,
      ),
    )

  const addItem = (type: 'folder' | 'note') => {
    let newItem: Item
    if (type === 'note') {
      newItem = {
        type,
        id: new Date().getTime(),
        content: '',
        title: 'New note',
      }
    } else {
      newItem = { type, id: new Date().getTime(), title: 'New folder' }
    }

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
