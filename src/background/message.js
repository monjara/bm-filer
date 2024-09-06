import {
  copyBookmark,
  createBookmark,
  getBookmarks,
  removeBookmark,
  updateBookmark,
} from './bookmark'

export function message(req, _, res) {
  switch (req.type) {
    case 'get_bookmarks':
      getBookmarks().then((result) => {
        res({ tree: result.tree })
      })
      break
    case 'update_bookmark':
      updateBookmark(req.id, req.title).then(() => {
        res({ result: 'success' })
      })
      break
    case 'copy_bookmark':
      copyBookmark(req.id)
      res({ result: 'success' })
      break
    case 'paste_bookmark':
      createBookmark({
        index: req.index,
        parentId: req.parentId,
        fromRegister: true,
      }).then(() => {
        res({ result: 'success' })
      })
      break
    case 'remove_bookmark':
      removeBookmark(req.id).then(() => {
        res({ result: 'success' })
      })
      break
    default:
      break
  }
  return true
}
