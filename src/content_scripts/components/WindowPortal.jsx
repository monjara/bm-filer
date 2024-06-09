import { createPortal } from 'react-dom'
import { useContentContext } from '../provider/ContentProvider'
import RenameProvider from '../provider/RenameProvider'
import KeymapProvider from '../provider/keymap-provider'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
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
