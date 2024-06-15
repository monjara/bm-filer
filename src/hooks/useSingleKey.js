import { shadowRoot } from '@/App'
import { useEffect } from 'react'

export default function useSingleKey(key, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        callback(e)
      }
    }
    shadowRoot.addEventListener('keydown', handler)
    return () => {
      shadowRoot.removeEventListener('keydown', handler)
    }
  })
}
