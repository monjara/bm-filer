import type { BMTreeNode } from '@/types/tree'

/**
 * BFS
 */
export default function flatTree(items: BMTreeNode[]): BMTreeNode[] {
  const result = []
  const queue = [...items]

  while (queue.length) {
    const node = queue.shift()
    if (node?.children) {
      queue.push(...node.children)
    }

    if (node) {
      result.push(node)
    }
  }

  return result
}
