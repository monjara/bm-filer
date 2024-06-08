import isDir from '@/utils/isDir'

export async function getBookmarks() {
  return await chrome.storage.local.get('tree')
}

export function setBookmarks() {
  const tree = []
  chrome.bookmarks.getTree(async (treeNode) => {
    for (const node of treeNode) {
      for (const child of node.children) {
        tree.push(child)
      }
    }
    await chrome.storage.local.set({ tree: prepareTree(tree) })
  })
}

function prepareTree(items) {
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
