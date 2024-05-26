let tree = []
function getBookmarks() {
  tree = []
  chrome.bookmarks.getTree((treeNode) => {
    for (const node of treeNode) {
      for (const child of node.children) {
        tree.push(child)
      }
    }
  })
}

chrome.runtime.onMessage.addListener(async (req, _, res) => {
  if (req.type === 'bookmarks') {
    res({ tree })
  }
  return true
})

chrome.runtime.onInstalled.addListener(getBookmarks)
chrome.bookmarks.onCreated.addListener(getBookmarks)
chrome.bookmarks.onRemoved.addListener(getBookmarks)
chrome.bookmarks.onChanged.addListener(getBookmarks)
chrome.bookmarks.onMoved.addListener(getBookmarks)
