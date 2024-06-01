/**
 * Flattens a tree structure
 * @param {Array} items: The tree structure to flatten
 * @returns {Array} The flattened tree structure
 */
export default function flatTree(items) {
  let result = []

  if (Array.isArray(items)) {
    for (const item of items) {
      result = result.concat(flatTree(item))
    }
    return result
  }

  result.push(items.id)
  if (items?.children) {
    for (const child of items.children) {
      result = result.concat(flatTree(child))
    }
  }

  return result
}
