import { createPortal } from 'react-dom'
import { useContentContext } from '../provider/content-provider'
import KeymapProvider from '../provider/keymap-provider'
import RenameProvider from '../provider/rename-provider'
import BookmarkWindow from './bookmark-window'

export default function Content() {
  const { isPressed } = useContentContext()

  if (!isPressed) {
    return null
  }

  return createPortal(
    <KeymapProvider>
      <RenameProvider>
        <BookmarkWindow />
      </RenameProvider>
    </KeymapProvider>,
    document.body
  )
}
