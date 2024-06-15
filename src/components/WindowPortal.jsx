import styles from '@/App.css?inline'
import CutProvider from '@/providers/CutProvider'
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
          <CutProvider>
            <PasteProvider>
              <BookmarkWindow />
              <style>{styles}</style>
            </PasteProvider>
          </CutProvider>
        </YankProvider>
      </RenameProvider>
    </NavigateProvider>
  )
}
