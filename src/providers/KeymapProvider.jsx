import CutProvider from './CutProvider'
import NavigateProvider from './NavigateProvider'
import PasteProvider from './PasteProvider'
import PerformProvider from './PerformProvider'
import RenameProvider from './RenameProvider'
import YankProvider from './YankProvider'

export default function KeymapProvider({ children }) {
  return (
    <NavigateProvider>
      <RenameProvider>
        <YankProvider>
          <CutProvider>
            <PasteProvider>
              <PerformProvider>{children}</PerformProvider>
            </PasteProvider>
          </CutProvider>
        </YankProvider>
      </RenameProvider>
    </NavigateProvider>
  )
}
