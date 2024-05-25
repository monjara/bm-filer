import App from '@/App.jsx'
import '@/content/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
