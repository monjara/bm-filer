import { useEffect } from 'react'

export default function useSingleKey(key, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        callback(e)
      }
    }
    document.body.addEventListener('keydown', handler)
    return () => {
      document.body.removeEventListener('keydown', handler)
    }
  }, [key, callback])
}
