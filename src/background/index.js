function setBookmarks() {
  const tree = []
  chrome.bookmarks.getTree(async (treeNode) => {
    for (const node of treeNode) {
      for (const child of node.children) {
        tree.push(child)
      }
    }
    await chrome.storage.local.set({ tree })
  })
}

async function getBookmarks() {
  return await chrome.storage.local.get('tree')
}

chrome.runtime.onMessage.addListener((req, _, res) => {
  if (req.type === 'bookmarks') {
    getBookmarks().then((result) => {
      res({ tree: result.tree })
    })
  }
  return true
})

chrome.runtime.onInstalled.addListener(setBookmarks)
chrome.bookmarks.onCreated.addListener(setBookmarks)
chrome.bookmarks.onRemoved.addListener(setBookmarks)
chrome.bookmarks.onChanged.addListener(setBookmarks)
chrome.bookmarks.onMoved.addListener(setBookmarks)
