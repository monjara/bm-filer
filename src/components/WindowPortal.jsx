import styles from '@/App.css?inline'
import NavigateProvider from '@/providers/NavigateProvider'
import PasteProvider from '@/providers/PasteProvider'
import RenameProvider from '@/providers/RenameProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import YankProvider from '@/providers/YankProvider'
import BookmarkWindow from './BookmarkWindow'

export default function WindowPortal() {
  const { open } = useToggleContext()

  if (!open) {
    return null
  }

  return (
    <NavigateProvider>
      <RenameProvider>
        <YankProvider>
          <PasteProvider>
            <BookmarkWindow />
            <style>{styles}</style>
          </PasteProvider>
        </YankProvider>
      </RenameProvider>
    </NavigateProvider>
  )
}
