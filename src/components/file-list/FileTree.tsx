import { cn } from '@/lib/utils'
import { isNote } from '@/types'
import { FileText, Folder } from 'lucide-react'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { FileNodeProps, FileTreeProps } from './types'

const FileTreeNode = (props: FileNodeProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (isNote(props.item)) {
    return (
      <button
        className={cn(
          'rounded-sm flex w-full px-3 py-1 items-center',
          'hover:bg-accent hover:text-accent-foreground',
          props.select.item === props.item.id &&
            'bg-accent text-accent-foreground',
        )}
        onClick={() => props.select.set(props.item.id)}
      >
        <FileText size={18} className="mr-2" />
        <span
          className="w-[180px] overflow-hidden whitespace-nowrap text-ellipsis text-left"
          title={props.item.title}
        >
          {props.item.title}
        </span>
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
                props.select.item === props.item.id &&
                  'bg-accent text-accent-foreground',
              )}
              onClick={() => props.select.set(props.item.id)}
            >
              <Folder size={18} className="mr-2" />
              <span
                className="w-[180px] overflow-hidden whitespace-nowrap text-ellipsis text-left"
                title={props.item.title}
              >
                {props.item.title}
              </span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="ml-5 border-l border-border pl-2">
            {props.item.children?.map((child) => (
              <FileTreeNode
                select={props.select}
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

const FileTree = (props: FileTreeProps) => {
  return (
    <div>
      {props.items.map((item) => (
        <FileTreeNode select={props.select} key={`${item.id}`} item={item} />
      ))}
    </div>
  )
}

export default FileTree
