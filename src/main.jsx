import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookmarkWindow from './components/BookmarkWindow'
import ItemsProvider from './providers/ItemsProvider'
import KeymapProvider from './providers/KeymapProvider'
import ToggleProvider from './providers/ToggleProvider'

const root = document.getElementById('bm-filer-iframe-root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ToggleProvider>
        <ItemsProvider>
          <KeymapProvider>
            <BookmarkWindow />
          </KeymapProvider>
        </ItemsProvider>
      </ToggleProvider>
    </StrictMode>
  )
}
