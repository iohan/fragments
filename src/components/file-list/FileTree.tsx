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
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from '@hello-pangea/dnd'

const FileTreeNode = (props: FileNodeProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Draggable
      draggableId={String(props.item.id)}
      index={props.index}
      key={props.item.id}
    >
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(isOpen && 'mb-3')}
        >
          {isNote(props.item) ? (
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
          ) : (
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
                  <Droppable droppableId={String(props.item.id)} type="FILE">
                    {(dropProvided: DroppableProvided) => (
                      <div
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                        className="ml-5 border-l border-border pl-2"
                      >
                        {props.item.children?.map((child, childIndex) => (
                          <FileTreeNode
                            select={props.select}
                            key={child.id}
                            item={child}
                            index={childIndex}
                          />
                        ))}
                      </div>
                    )}
                  </Droppable>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

const FileTree = (props: FileTreeProps) => {
  return (
    <Droppable droppableId="ROOT" type="FILE">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {props.items.map((item, index) => (
            <FileTreeNode
              key={item.id}
              item={item}
              index={index}
              select={props.select}
            />
          ))}
        </div>
      )}
    </Droppable>
  )
}

export default FileTree
