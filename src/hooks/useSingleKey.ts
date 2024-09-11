import { useEffect } from 'react'

export default function useSingleKey(
  key: string,
  callback: (e: KeyboardEvent) => void
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
