import '@/content_scripts/app.css'
import ContentProvider from '@/content_scripts/provider/ContentProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import WindowPortal from './components/WindowPortal'

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
