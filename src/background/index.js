const tree = []
chrome.bookmarks.getTree((treeNode) => {
  for (const node of treeNode) {
    tree.push(node)
  }
})

chrome.runtime.onMessage.addListener(async (req, _, res) => {
  if (req.type === 'bookmarks') {
    res({ tree })
  }
  return true
})
