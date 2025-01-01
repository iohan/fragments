import { FileText, Folder, FolderPlus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { isNote, Item } from '@/types'

interface FileListProps {
  items: Item[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
  onNewNote: () => void
  onNewFolder: () => void
}

const FileList = ({
  items,
  selectedItem,
  onSelectItem,
  onNewNote,
  onNewFolder,
}: FileListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex space-x-2 border-b">
        <Button className="w-full" onClick={onNewNote}>
          <Plus className="w-4 h-4 mr-2" />
          New note
        </Button>
        <Button className="" onClick={onNewFolder}>
          <FolderPlus className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {items.map((item, key) => (
            <Button
              key={key}
              className="w-full justify-start"
              variant={selectedItem === item.id ? 'secondary' : 'ghost'}
              onClick={() => onSelectItem(item.id)}
            >
              {isNote(item) ? <FileText /> : <Folder />}
              {item.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default FileList
