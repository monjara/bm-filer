import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Content from './components/content'
import ContentProvider from './provider/ContentProvider'
import KeymapProvider from './provider/KeymapProvider'

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
