import { createPortal } from 'react-dom'
import { useContentContext } from '../provider/ContentProvider'
import BookmarkWidnow from './bm-window'

export default function Content() {
  const { isPressed } = useContentContext()

  if (!isPressed) {
    return null
  }

  return createPortal(<BookmarkWidnow />, document.body)
}
