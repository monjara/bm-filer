import { useEffect, useRef } from 'react'

export default function useRepeatKeys(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options = {
    duration: 500,
  }
) {
  const keyCount = useRef<number>(0)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        keyCount.current += 1
        if (keyCount.current === 1) {
          timer = setTimeout(() => {
            keyCount.current = 0
          }, options.duration)
        } else if (keyCount.current === 2) {
          callback(e)
          keyCount.current = 0
        }
      }
    }

    document.body.addEventListener('keydown', handler)
    return () => {
      document.body.removeEventListener('keydown', handler)
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [key, callback, options])
}
