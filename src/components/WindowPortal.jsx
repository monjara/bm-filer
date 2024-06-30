import styles from '@/App.css?inline'
import KeymapProvider from '@/providers/KeymapProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
  const { open } = useToggleContext()

  if (!open) {
    return null
  }

  return (
    <KeymapProvider>
      <BookmarkWindow />
      <style>{styles}</style>
    </KeymapProvider>
  )
}
