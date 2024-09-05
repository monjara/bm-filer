import CutProvider from './CutProvider'
import ItemsProvider from './ItemsProvider'
import NavigateProvider from './NavigateProvider'
import OpenProvider from './OpenProvider'
import PasteProvider from './PasteProvider'
import PerformProvider from './PerformProvider'
import RenameProvider from './RenameProvider'
import ToggleProvider from './ToggleProvider'
import YankProvider from './YankProvider'

export default function Provider({ children }) {
  return (
    <ToggleProvider>
      <ItemsProvider>
        <OpenProvider>
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
        </OpenProvider>
      </ItemsProvider>
    </ToggleProvider>
  )
}
