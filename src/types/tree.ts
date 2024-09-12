export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode
export type BMTreeNode = BookmarkTreeNode & {
  prevDir?: string
  nextDir?: string
}
