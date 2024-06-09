import styles from '@/App.css?inline'
import NavigateProvider from '@/providers/NavigateProvider'
import RenameProvider from '@/providers/RenameProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
  const { open } = useToggleContext()

  if (!open) {
    return null
  }

  return (
    <NavigateProvider>
      <RenameProvider>
        <BookmarkWindow />
        <style>{styles}</style>
      </RenameProvider>
    </NavigateProvider>
  )
}
