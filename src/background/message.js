import { getBookmarks } from './bookmark'

export function message(req, _, res) {
  if (req.type === 'bookmarks') {
    getBookmarks().then((result) => {
      res({ tree: result.tree })
    })
  }
  return true
}
