import TextEditor from './components/TextEditor'
import FileList from './components/FileList'
import { items as initialItems } from './static'
import useItem from './lib/use-item'

function App() {
  const { deleteItem, changeItem, addItem, selectItem, items, selectedItem } =
    useItem(initialItems)

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border">
        <FileList
          items={items}
          selectedItem={selectedItem}
          onSelectItem={(item) => selectItem(item)}
          onNewItem={addItem}
        />
      </div>
      <div className="flex-1 flex overflow-hidden">
        {selectedItem && (
          <TextEditor
            item={selectedItem}
            onChange={(item) => changeItem(item)}
            onDelete={(id) => deleteItem(id)}
          />
        )}
      </div>
    </div>
  )
}

export default App
