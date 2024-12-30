import TextEditor from './components/TextEditor'
import FileList from './components/FileList'
import { items as initialItems } from './static'
import { useState } from 'react'
import { Note } from './types'
import { addItem, deleteItem, updateItem } from './lib/crud'

function App() {
  const [selectedItem, setSelectedItem] = useState<Note | null>(null)
  const [items, setItems] = useState<Note[]>(initialItems)

  const handleOnChange = (changedItem: Omit<Note, 'id'>) => {
    if (!selectedItem) {
      return
    }

    setItems(updateItem({ id: selectedItem.id, ...changedItem })(items))
    setSelectedItem({ id: selectedItem.id, ...changedItem })
  }

  const handleOnAdd = () => {
    const updatedItems = addItem(items)
    setItems(updatedItems)
    setSelectedItem([...updatedItems].pop() ?? null)
  }

  const handleOnDelete = (id: number) => {
    setItems(deleteItem(id)(items))
    setSelectedItem(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border">
        <FileList
          items={items}
          selectedItem={selectedItem}
          onSelectItem={(item) => setSelectedItem(item)}
          onNewItem={handleOnAdd}
        />
      </div>
      <div className="flex-1 flex overflow-hidden">
        {selectedItem && (
          <TextEditor
            item={selectedItem}
            onChange={(item) => handleOnChange(item)}
            onDelete={(id) => handleOnDelete(id)}
          />
        )}
      </div>
    </div>
  )
}

export default App
