import { Item } from './types'

export const items: Item[] = [
  {
    id: 1,
    title: 'Hello',
    type: 'note',
    content: 'World!',
  },
  {
    id: 2,
    type: 'folder',
    title: 'My folder',
    children: [
      {
        id: 3,
        type: 'note',
        title: 'My sub note',
        content: 'Mocked sub content',
      },
    ],
  },
]
