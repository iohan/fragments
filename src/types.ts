export interface Note {
  type: 'note'
  id: number
  title: string
  content: string
}

export interface Folder {
  type: 'folder'
  id: number
  title: string
}

export type Item = Note | Folder

export const isNote = (item: Partial<Note> | Partial<Folder>): item is Note =>
  'content' in item
export const isFolder = (
  item: Partial<Note> | Partial<Folder>,
): item is Folder => !isNote(item)
