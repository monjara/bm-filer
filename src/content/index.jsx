import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Content from './components/content'

const root = document.createElement('div')
root.id = 'bm-filer-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>
)
