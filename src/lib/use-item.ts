import { isFolder, isNote, Item } from '../types'
import { useState } from 'react'
import { recurseMap } from './recurse-map'
import { recurseFind } from './recurse-find'
import { recurseDelete } from './recurse-delete'

const useItem = (initialItems: Item[]) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [items, setItems] = useState<Item[]>(initialItems)

  const changeItem = (item: { id: number } & Partial<Item>) => {
    if (item && item.title) {
      updateTitleOfItem(item.id, item.title)
    }

    if (item && isNote(item) && item.content) {
      updateContentOfNote(item.id, item.content)
    }
  }

  const updateTitleOfItem = (id: number, title: string) =>
    setItems((prev) =>
      recurseMap<Item>('children', (item) => {
        if (item.id === id) {
          return { ...item, title }
        }
      })(prev),
    )

  const updateContentOfNote = (id: number, content: string) =>
    setItems((prev) =>
      recurseMap<Item>('children', (item) => {
        if (item.id === id && isNote(item)) {
          return { ...item, content }
        }
      })(prev),
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

    const selectedFolder = recurseFind<Item>(
      'children',
      (x) => x.id === selectedItem && isFolder(x),
    )(items)

    if (selectedFolder) {
      setItems((prev) =>
        recurseMap<Item>('children', (item) => {
          if (item.id === selectedFolder.id) {
            return { ...item, children: [...(item.children ?? []), newItem] }
          }
        })(prev),
      )
    } else {
      setItems((prev) => [...prev, newItem])
    }

    setSelectedItem(newItem.id)
  }

  const deleteItem = (id: number) => {
    setItems((prev) =>
      recurseDelete<Item>('children', (item) => item.id === id)(prev),
    )
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
