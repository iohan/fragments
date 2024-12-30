import { Note } from '@/types'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

interface TextEditorProps {
  item: Note
  onChange: ({ content, title }: { content: string; title: string }) => void
  onDelete: (id: number) => void
}

const TextEditor = ({ item, onChange, onDelete }: TextEditorProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-2 border-b border-border flex items-center">
        Title:{' '}
        <Input
          value={item.title}
          onChange={(e) =>
            onChange({ content: item.content, title: e.target.value })
          }
          className="border-0 shadow-none"
        />
        <DeleteItem onConfirm={() => onDelete(item.id)} />
      </div>
      <Textarea
        value={item.content}
        onChange={(e) =>
          onChange({ content: e.target.value, title: item.title })
        }
        className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start typing your note here..."
      />
    </div>
  )
}

const DeleteItem = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>
          <X /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            <X /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TextEditor
