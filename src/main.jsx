import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookmarkWindow from './components/BookmarkWindow'
import Provider from './providers/Provider'

const root = document.getElementById('bm-filer-iframe-root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider>
        <BookmarkWindow />
      </Provider>
    </StrictMode>
  )
}
