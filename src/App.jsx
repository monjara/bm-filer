import '@/app.css'
import WindowPortal from '@/components/WindowPortal'
import ContentProvider from '@/providers/ContentProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('div')
root.id = 'bm-filer-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentProvider>
      <WindowPortal />
    </ContentProvider>
  </React.StrictMode>
)
