import { FileText, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Note } from '@/types'

interface FileListProps {
  items: Note[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
  onNewItem: () => void
}

const FileList = ({
  items,
  selectedItem,
  onSelectItem,
  onNewItem,
}: FileListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-b">
        <Button className="w-full" onClick={onNewItem}>
          <Plus className="w-4 h-4 mr-2" />
          New note
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
              <FileText />
              {item.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default FileList
