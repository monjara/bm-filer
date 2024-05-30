import { useToggleListener } from '@/hooks/useToggleListener'
import { createPortal } from 'react-dom'
import BookmarkWidnow from './bm-window'

export default function Content() {
  const { isPressed, items } = useToggleListener('a', 1000)
  console.log('items: ', items)

  if (!isPressed) {
    return null
  }

  return createPortal(<BookmarkWidnow items={items} />, document.body)
}
