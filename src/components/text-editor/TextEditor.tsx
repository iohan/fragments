import { Note } from '@/types'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import DeleteItem from './DeleteItem'

interface TextEditorProps {
  item?: Note
  onChange: (item: Note) => void
  onDelete: (id: number) => void
}

const TextEditor = ({ item, onChange, onDelete }: TextEditorProps) => {
  if (!item) {
    return <></>
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-2 border-b border-border flex items-center">
        Title:{' '}
        <Input
          value={item.title}
          onChange={(e) =>
            onChange({
              id: item.id,
              type: 'note',
              content: item.content,
              title: e.target.value,
            })
          }
          className="border-0 shadow-none"
        />
        <DeleteItem onConfirm={() => onDelete(item.id)} />
      </div>
      <Textarea
        value={item.content}
        onChange={(e) =>
          onChange({
            id: item.id,
            type: 'note',
            content: e.target.value,
            title: item.title,
          })
        }
        className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start typing your note here..."
      />
    </div>
  )
}

export default TextEditor
