import { describe, expect, test } from 'vitest'
import { recurseMap } from '../recurse-map'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

describe('recurseMap', () => {
  test('should apply the predicate to every item in a flat array', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
      { id: 3, name: 'Node C' },
    ]

    const predicate = (node: TreeNode) => {
      if (node.name === 'Node B') {
        return { ...node, name: 'Updated B' }
      }
    }

    const result = recurseMap<TreeNode>('children', predicate)(items)

    expect(result[0].name).toBe('Node A')
    expect(result[1].name).toBe('Updated B')
    expect(result[2].name).toBe('Node C')
  })

  test('should handle the case where predicate never returns an update', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
    ]

    const predicate = () => {
      return undefined
    }

    const result = recurseMap<TreeNode>('children', predicate)(items)

    expect(result[0].name).toBe('Node A')
    expect(result[1].name).toBe('Node B')
  })

  test('should recurse into nested arrays and apply the predicate', () => {
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
            children: [{ id: 7, name: 'Nested Child' }],
          },
        ],
      },
    ]

    const predicate = (node: TreeNode) => {
      if (node.id === 3 || node.id === 7) {
        return { ...node, name: `${node.name} - updated` }
      }
    }

    const result = recurseMap<TreeNode>('children', predicate)(items)

    expect(result[0].name).toBe('Root 1')
    expect(result[0].children?.[1].name).toBe('Child 2 - updated')
    expect(result[1].children?.[1].name).toBe('Nested Parent')
    expect(result[1].children?.[1].children?.[0].name).toBe(
      'Nested Child - updated',
    )
  })

  test('should still return the same shape of data even if key is missing or not an array', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'No children here' },
      {
        id: 2,
        name: 'This one has children',
        children: [{ id: 3, name: 'Child node' }],
      },
    ]

    const predicate = (node: TreeNode) => {
      if (node.id === 1) {
        return { ...node, name: 'Updated name' }
      }
      return undefined
    }

    const result = recurseMap<TreeNode>('children', predicate)(items)

    expect(result[0].name).toBe('Updated name')
    expect(result[1].name).toBe('This one has children')
    expect(result[1].children?.[0].name).toBe('Child node')
  })

  test('should work with an empty array', () => {
    const items: TreeNode[] = []
    const predicate = (node: TreeNode) => {
      return { ...node, name: 'test' }
    }

    const result = recurseMap<TreeNode>('children', predicate)(items)

    expect(result).toEqual([])
  })
})
