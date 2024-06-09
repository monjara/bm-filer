import WindowPortal from '@/components/WindowPortal'
import ItemsProvider from '@/providers/ItemsProvider'
import ToggleProvider from '@/providers/ToggleProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('div')
root.id = 'bm-filer-root'
export const shadowRoot = root.attachShadow({ mode: 'open' })
const shadowWrapper = document.createElement('div')
shadowWrapper.id = 'root'
document.children[0].append(root)
shadowRoot.append(shadowWrapper)

ReactDOM.createRoot(shadowWrapper).render(
  <React.StrictMode>
    <ToggleProvider>
      <ItemsProvider>
        <WindowPortal />
      </ItemsProvider>
    </ToggleProvider>
  </React.StrictMode>
)
