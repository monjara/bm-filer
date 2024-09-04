import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WindowPortal from './components/WindowPortal'
import ItemsProvider from './providers/ItemsProvider'
import ToggleProvider from './providers/ToggleProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToggleProvider>
      <ItemsProvider>
        <WindowPortal />
      </ItemsProvider>
    </ToggleProvider>
  </StrictMode>
)
