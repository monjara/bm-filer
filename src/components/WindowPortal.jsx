import { useContentContext } from '@/providers/ContentProvider'
import KeymapProvider from '@/providers/KeymapProvider'
import RenameProvider from '@/providers/RenameProvider'
import { createPortal } from 'react-dom'
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
