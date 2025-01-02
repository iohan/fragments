import { describe, expect, test } from 'vitest'
import { recurseDelete } from '../recurse-delete'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

describe('recurseDelete', () => {
  test('should remove items matching the predicate in a flat array', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
      { id: 3, name: 'Node C' },
    ]

    const predicate = (node: TreeNode) => node.id % 2 === 0

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result).toHaveLength(2)
    expect(result.map(({ id }) => id)).toEqual([1, 3])
  })

  test('should not remove any items if the predicate never returns true', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
    ]

    const predicate = () => false

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result).toEqual(items)
  })

  test('should remove all items if the predicate always returns true', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
    ]

    const predicate = () => true

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result).toEqual([])
  })

  test('should recurse into nested arrays and remove matching items', () => {
    const items: TreeNode[] = [
      {
        id: 1,
        name: 'Root 1',
        children: [
          { id: 2, name: 'Child 1' },
          { id: 3, name: 'Child 2' },
        ],
      },
      {
        id: 4,
        name: 'Root 2',
        children: [
          { id: 5, name: 'Child 3' },
          {
            id: 6,
            name: 'Nested Parent',
            children: [
              { id: 7, name: 'Nested Child 1' },
              { id: 8, name: 'Nested Child 2' },
            ],
          },
        ],
      },
    ]

    const predicate = (node: TreeNode) => node.name.includes('Child 2')

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result[0].children).toHaveLength(1)
    expect(result[0].children?.[0].id).toBe(2)

    expect(result[1].children).toHaveLength(2)

    const nestedParent = result[1].children?.[1]
    expect(nestedParent).toBeDefined()

    expect(nestedParent?.children).toHaveLength(1)
    expect(nestedParent?.children?.[0].id).toBe(7)
  })

  test('should handle empty arrays without error', () => {
    const items: TreeNode[] = []

    const predicate = (node: TreeNode) => node.id === 999

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result).toEqual([])
  })

  test('should handle cases where the key is missing or not an array', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'No children property' },
      {
        id: 2,
        name: 'Has children',
        children: [
          { id: 3, name: 'Child node' },
          { id: 4, name: 'Another child node' },
        ],
      },
      {
        id: 5,
        name: 'Bad children type',
        children: 'Not an array' as unknown as TreeNode[],
      },
    ]

    const predicate = (node: TreeNode) => node.id === 4

    const result = recurseDelete<TreeNode>('children', predicate)(items)

    expect(result[0].id).toBe(1)

    expect(result[1].children).toHaveLength(1)
    expect(result[1].children?.[0].id).toBe(3)

    expect(result[2].id).toBe(5)
    expect(result[2].children).toBe('Not an array')
  })
})
