import TextEditor from './components/text-editor/TextEditor'
import FileList from './components/FileList'
import { items as initialItems } from './static'
import useItem from './lib/use-item'
import { isNote } from './types'
import { findItemById } from './lib/utils'

function App() {
  const { deleteItem, changeItem, addItem, selectItem, items, selectedItem } =
    useItem(initialItems)

  const selectedItemById = findItemById(selectedItem)(items)

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border">
        <FileList
          items={items}
          selectedItem={selectedItem}
          onSelectItem={(item) => selectItem(item)}
          onNewNote={() => addItem('note')}
          onNewFolder={() => addItem('folder')}
        />
      </div>
      <div className="flex-1 flex overflow-hidden">
        {selectedItemById && isNote(selectedItemById) && (
          <TextEditor
            item={selectedItemById}
            onChange={(item) => changeItem(item)}
            onDelete={(id) => deleteItem(id)}
          />
        )}
      </div>
    </div>
  )
}

export default App
