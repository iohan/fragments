import { renderHook, act, RenderHookResult } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import useItem from '../use-item'
import { isFolder, isNote, Item } from '../../types'
import { findItemById } from '../utils'

const initialItems: Item[] = [
  {
    id: 1,
    type: 'note',
    title: 'Mock',
    content: 'Mocked content',
  },
  {
    id: 2,
    type: 'folder',
    title: 'Mocked folder',
    children: [
      {
        id: 3,
        type: 'note',
        title: 'Sub note',
        content: 'Mocked sub content',
      },
    ],
  },
]

describe('useItem hook', () => {
  let result: RenderHookResult<ReturnType<typeof useItem>, unknown>['result']

  beforeEach(() => {
    const hook = renderHook(() => useItem(initialItems))
    result = hook.result
  })

  test('should update title of note/folder by id', () => {
    act(() => {
      result.current.changeItem({
        id: 3,
        title: 'Mock it',
      })
    })

    expect(findItemById(3)(result.current.items)?.title).toBe('Mock it')
  })

  test('should update content of note by id', () => {
    act(() => {
      result.current.changeItem({
        id: 3,
        content: 'New content',
      })
    })

    const updatedItem = findItemById(3)(result.current.items)

    if (!updatedItem || isFolder(updatedItem)) {
      throw new Error('Item undefined or of wrong type')
    }

    expect(updatedItem.content).toBe('New content')
  })

  test('should select an note/folder by id', () => {
    act(() => {
      result.current.selectItem(3)
    })

    expect(findItemById(3)(result.current.items)?.title).toBe('Sub note')
  })

  test('should add a new note', () => {
    act(() => {
      result.current.addItem('note')
    })

    const newItem = [...result.current.items].pop()
    if (!newItem || isFolder(newItem)) {
      throw new Error('newItem is undefined or of wrong type')
    }

    expect(result.current.items.length).toBe(3)
    expect(newItem.type).toBe('note')
  })

  test('should add a new sub note', () => {
    act(() => {
      result.current.selectItem(2)
    })
    act(() => {
      result.current.addItem('note')
    })

    const selectedFolder = findItemById(2)(result.current.items)

    expect(selectedFolder?.children?.length).toBe(2)
  })

  test('should add a new folder', () => {
    act(() => {
      result.current.addItem('folder')
    })

    const newItem = [...result.current.items].pop()
    if (!newItem || isNote(newItem)) {
      throw new Error('newItem is undefined or of wrong type')
    }

    expect(result.current.items.length).toBe(3)
    expect(newItem.type).toBe('folder')
  })

  test('should delete a note/folder by id', () => {
    act(() => {
      result.current.addItem('note')
    })

    const newItem = [...result.current.items].pop()
    if (!newItem || isFolder(newItem)) {
      throw new Error('newItem is undefined or of wrong type')
    }

    expect(result.current.items.length).toBe(3)

    act(() => {
      result.current.deleteItem(1)
    })

    expect(result.current.items.length).toBe(2)
    expect(findItemById(1)(result.current.items)).toBeUndefined()
  })
})
