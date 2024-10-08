import type { BMTreeNode, BookmarkTreeNode } from '@/types/tree'
import isDir from '@/utils/isDir'

export type TreeStorageItem = {
  tree: BMTreeNode[]
}

export async function getTree(): Promise<TreeStorageItem> {
  return (await chrome.storage.local.get('tree')) as TreeStorageItem
}

export function resetTree({ withMessage = false } = {}): void {
  const tree: BMTreeNode[] = []
  chrome.bookmarks.getTree(async (treeNode) => {
    for (const node of treeNode) {
      const children = node.children
      if (children) {
        for (const child of children) {
          tree.push(child)
        }
      }
    }
    const bmTree = prepareTree(tree) as BMTreeNode[]
    await Promise.all([
      chrome.storage.local.set({ tree: bmTree }),
      withMessage &&
        chrome.runtime.sendMessage({ type: 'reset_tree', tree: bmTree }),
    ])
  })
}

// TODO: 非再帰
function prepareTree(
  tree: BookmarkTreeNode[] | undefined
): BMTreeNode[] | undefined {
  if (!tree) return
  const items = tree as BMTreeNode[]
  const length = items.length
  for (let i = 0; i < length; i++) {
    if (isDir(items[i])) {
      const prev = i === 0 ? items[length - 1] : items[i - 1]
      const next = i === length - 1 ? items[0] : items[i + 1]
      items[i].prevDir = prev.id
      items[i].nextDir = next.id
      prepareTree(items[i].children)
    }
  }
  return items
}
