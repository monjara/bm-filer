/**
 * BFS
 */
export default function flatTree(items) {
  const result = []
  const queue = [...items]

  while (queue.length) {
    const node = queue.shift()
    if (node?.children) {
      queue.push(...node.children)
    }

    result.push(node)
  }

  return result
}
