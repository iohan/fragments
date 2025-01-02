import { FolderPlus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Item } from '@/types'
import FileTree from './FileTree'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

interface FileListProps {
  items: Item[]
  selectedItem: number | null
  fn: {
    onSelect: (id: number) => void
    onNewNote: () => void
    onNewFolder: () => void
  }
}

const FileList = (props: FileListProps) => {
  const onDragEnd = (result: DropResult<string>) => {
    console.log(result)
  }

  const NewNoteButton = () => (
    <Button className="w-full" onClick={props.fn.onNewNote}>
      <Plus className="w-4 h-4 mr-2" />
      New note
    </Button>
  )

  const NewFolderButton = () => (
    <Button onClick={props.fn.onNewFolder}>
      <FolderPlus className="w-4 h-4" />
    </Button>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex space-x-2 border-b">
        <NewNoteButton />
        <NewFolderButton />
      </div>
      <ScrollArea className="flex-1">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="p-4">
            <FileTree
              items={props.items}
              select={{ item: props.selectedItem, set: props.fn.onSelect }}
            />
          </div>
        </DragDropContext>
      </ScrollArea>
    </div>
  )
}

export default FileList
