import {
  copyBookmark,
  createBookmark,
  getBookmarks,
  removeBookmark,
  updateBookmark,
} from './bookmark'

type Request = {
  type: MessageType
  id?: string
  title?: string
  index?: number
  parentId?: string
}

type MessageType =
  | 'get_bookmarks'
  | 'update_bookmark'
  | 'copy_bookmark'
  | 'paste_bookmark'
  | 'remove_bookmark'

export function message(req: Request, _: unknown, res: (res: unknown) => void) {
  switch (req.type) {
    case 'get_bookmarks':
      getBookmarks().then((result) => {
        res({ tree: result.tree })
      })
      break
    case 'update_bookmark':
      if (!req.id || !req.title) {
        console.error('update_bookmark: id or title is not found')
        return
      }
      updateBookmark(req.id, req.title).then(() => {
        res({ result: 'success' })
      })
      break
    case 'copy_bookmark':
      if (!req.id) {
        console.error('copy_bookmark: id is not found')
        return
      }
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
      if (!req.id) {
        console.error('remove_bookmark: id is not found')
        return
      }
      removeBookmark(req.id).then(() => {
        res({ result: 'success' })
      })
      break
    default:
      break
  }
  return true
}
