import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Content from './components/content'
import ContentProvider from './provider/content-provider'
import KeymapProvider from './provider/keymap-provider'

const root = document.createElement('div')
root.id = 'bm-filer-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentProvider>
      <KeymapProvider>
        <Content />
      </KeymapProvider>
    </ContentProvider>
  </React.StrictMode>
)
