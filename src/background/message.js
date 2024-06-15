import { getBookmarks, moveBookmark, updateBookmark } from './bookmark'

export function message(req, _, res) {
  if (req.type === 'get_bookmarks') {
    getBookmarks().then((result) => {
      res({ tree: result.tree })
    })
  }
  if (req.type === 'update_bookmark') {
    updateBookmark(req.id, req.title).then(() => {
      res({ result: 'success' })
    })
  }
  if (req.type === 'move_bookmark') {
    const { id, distIndex, distParentId } = req
    moveBookmark(id, { index: distIndex, parentId: distParentId }).then(() => {
      res({ result: 'success' })
    })
  }
  return true
}
