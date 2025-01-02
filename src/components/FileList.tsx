import { FileText, Folder, FolderPlus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { isNote, Item } from '@/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

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
          <FileTree
            items={items}
            selectedItem={selectedItem}
            onSelectItem={onSelectItem}
          />
        </div>
      </ScrollArea>
    </div>
  )
}

interface FileTreeProps {
  items: Item[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
}

interface FileNodeProps {
  item: Item
  selectedItem: number | null
  onSelectItem: (id: number) => void
}

const FileTreeNode = ({ item, selectedItem, onSelectItem }: FileNodeProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (isNote(item)) {
    return (
      <button
        className={cn(
          'rounded-sm flex w-full px-3 py-1 items-center',
          'hover:bg-accent hover:text-accent-foreground',
          selectedItem === item.id && 'bg-accent text-accent-foreground',
        )}
        onClick={() => onSelectItem(item.id)}
      >
        <FileText size={18} className="mr-2" />
        <span>{item.title}</span>
      </button>
    )
  }

  return (
    <div className={cn(isOpen && 'mb-3')}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center space-x-2 py-1">
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                'rounded-sm flex w-full px-3 py-1 items-center',
                'hover:bg-accent hover:text-accent-foreground',
                selectedItem === item.id && 'bg-accent text-accent-foreground',
              )}
              onClick={() => onSelectItem(item.id)}
            >
              <Folder size={18} className="mr-2" />
              <span>{item.title}</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="ml-5 border-l border-border pl-2">
            {item.children?.map((child) => (
              <FileTreeNode
                selectedItem={selectedItem}
                onSelectItem={onSelectItem}
                key={`${child.id}`}
                item={child}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
const FileTree = ({ items, selectedItem, onSelectItem }: FileTreeProps) => {
  return (
    <div>
      {items.map((item) => (
        <FileTreeNode
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          key={`${item.id}`}
          item={item}
        />
      ))}
    </div>
  )
}

export default FileList
