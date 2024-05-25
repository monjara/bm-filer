import Content from '@/content/content.jsx'
import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>
)
