import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Content from './components/content'
import ContentProvider from './provider/content-provider'

const root = document.createElement('div')
root.id = 'bm-filer-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentProvider>
      <Content />
    </ContentProvider>
  </React.StrictMode>
)
