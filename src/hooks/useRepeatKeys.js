import { shadowRoot } from '@/App'
import { useEffect, useRef } from 'react'

export default function useRepeatKeys(
  key,
  callback,
  options = {
    duration: 500,
  }
) {
  const keyCount = useRef(0)

  useEffect(() => {
    let timer
    const handler = (e) => {
      if (e.key === key) {
        keyCount.current += 1
        if (keyCount.current === 1) {
          timer = setTimeout(() => {
            keyCount.current = 0
          }, options.duration)
        } else if (keyCount.current === 2) {
          callback()
          keyCount.current = 0
        }
      }
    }

    shadowRoot.addEventListener('keydown', handler)
    return () => {
      shadowRoot.removeEventListener('keydown', handler)
      clearTimeout(timer)
    }
  }, [key, callback, options])
}
