import styles from '@/App.css?inline'
import KeymapProvider from '@/providers/KeymapProvider'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
  return (
    <KeymapProvider>
      <BookmarkWindow />
      <style>{styles}</style>
    </KeymapProvider>
  )
}
