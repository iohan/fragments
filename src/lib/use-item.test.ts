import { renderHook, act, RenderHookResult } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import useItem from './use-item'
import { Note } from '@/types'

const initialItems: Note[] = [
  {
    id: 1,
    title: 'Mock',
    content: 'Mocked content',
  },
]

describe('useItem hook', () => {
  let result: RenderHookResult<ReturnType<typeof useItem>, unknown>['result']

  beforeEach(() => {
    const hook = renderHook(() => useItem(initialItems))
    result = hook.result
  })

  const findItemById = (id: number) =>
    result.current.items.find((item) => item.id === id)

  test('should update title of item by id', () => {
    act(() => {
      result.current.changeItem({
        id: 1,
        title: 'Mock it',
      })
    })

    expect(findItemById(1)?.title).toBe('Mock it')
  })

  test('should update description of item by id', () => {
    act(() => {
      result.current.changeItem({
        id: 1,
        content: 'New content',
      })
    })

    expect(findItemById(1)?.content).toBe('New content')
  })

  test('should select an item by id', () => {
    act(() => {
      result.current.selectItem(1)
    })

    expect(findItemById(1)?.title).toBe('Mock')
  })

  test('should add a new item', () => {
    act(() => {
      result.current.addItem()
    })

    const newItem = [...result.current.items].pop()

    expect(result.current.items.length).toBe(2)

    expect(newItem).toBeDefined()
  })

  test('should delete an item by id', () => {
    act(() => {
      result.current.addItem()
    })

    const newItem = [...result.current.items].pop()
    if (!newItem?.id) {
      throw new Error('newItem is undefined')
    }

    expect(result.current.items.length).toBe(2)

    act(() => {
      result.current.deleteItem(1)
    })

    expect(result.current.items.length).toBe(1)
    expect(findItemById(1)).toBeUndefined()
  })
})
