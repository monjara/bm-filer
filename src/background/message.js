import { getBookmarks, updateBookmark } from './bookmark'

export function message(req, _, res) {
  if (req.type === 'get_bookmarks') {
    getBookmarks().then((result) => {
      res({ tree: result.tree })
    })
  }
  if (req.type === 'update_bookmark') {
    updateBookmark(req.id, req.title)
  }
  return true
}
