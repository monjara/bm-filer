import '@/app.css'
import WindowPortal from '@/components/WindowPortal'
import ItemsProvider from '@/providers/ItemsProvider'
import ToggleProvider from '@/providers/ToggleProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('div')
root.id = 'bm-filer-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ToggleProvider>
      <ItemsProvider>
        <WindowPortal />
      </ItemsProvider>
    </ToggleProvider>
  </React.StrictMode>
)
