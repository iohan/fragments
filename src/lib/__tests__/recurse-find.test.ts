// Return undefined for parent when in top-level

import { describe, expect, test } from 'vitest'
import { recurseFind } from '../recurse-find'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

describe('recurseFind', () => {
  test('should find node in a flat array', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
      { id: 3, name: 'Node C' },
    ]

    const predicate = (node: TreeNode) => {
      if (node.name === 'Node B') {
        return node
      }
    }

    const result = recurseFind<TreeNode>('children', predicate)(items)

    expect(result).toBeDefined()
    expect(result?.name).toBe('Node B')
  })

  test('should recurse into nested arrays and find a node', () => {
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
      if (node.name === 'Nested Parent') {
        return node
      }
    }

    const result = recurseFind<TreeNode>('children', predicate)(items)

    expect(result?.name).toBe('Nested Parent')
    expect(result?.children).toBeDefined()
  })

  test('should recurse into nested arrays, find node and return the parent node', () => {
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

    const predicate = (node: TreeNode, parent?: TreeNode) => {
      if (node.name === 'Nested Parent') {
        return parent
      }
    }

    const result = recurseFind<TreeNode>('children', predicate)(items)

    expect(result?.name).toBe('Root 2')
    expect(result?.children?.[1].name).toBe('Nested Parent')
  })

  test('should return undefined if nothing found', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
      { id: 3, name: 'Node C' },
    ]

    const predicate = (node: TreeNode) => {
      if (node.name === 'Node D') {
        return node
      }
    }

    const result = recurseFind<TreeNode>('children', predicate)(items)

    expect(result).toBeUndefined()
  })

  test('should return undefined parent when in top-level', () => {
    const items: TreeNode[] = [
      { id: 1, name: 'Node A' },
      { id: 2, name: 'Node B' },
      { id: 3, name: 'Node C' },
    ]

    const predicate = (node: TreeNode, parent?: TreeNode) => {
      if (node.name === 'Node B') {
        return parent
      }
    }

    const result = recurseFind<TreeNode>('children', predicate)(items)

    expect(result).toBeUndefined()
  })
})
