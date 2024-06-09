import KeymapProvider from '@/providers/KeymapProvider'
import RenameProvider from '@/providers/RenameProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import { createPortal } from 'react-dom'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
  const { open } = useToggleContext()

  if (!open) {
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
