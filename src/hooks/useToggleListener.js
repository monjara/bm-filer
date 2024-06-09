import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { getBookmarks } from '@/utils/message'
import { useEffect, useRef, useState } from 'react'

export function useToggleListener(hotKey, duration = 1000) {
  const [items, setItems] = useState([])
  const [isPressed, setIsPressed] = useState(false)
  const ref = useRef(0)

  useEffect(() => {
    let timerId
    const handler = (e) => {
      if (isInputTarget(e)) {
        return
      }

      if (e.key === hotKey) {
        ref.current += 1
        timerId = setTimeout(() => {
          ref.current = 0
        }, duration)
      }
      if (ref.current === 2) {
        setIsPressed(true)
        ref.current = 0
      }

      if (e.key === keys.ESC) {
        close()
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      ref.current = 0
      clearTimeout(timerId)
      window.removeEventListener('keydown', handler)
    }
  }, [hotKey, duration])

  useEffect(() => {
    if (isPressed) {
      getBookmarks().then((result) => {
        setItems(result.tree)
      })
    }
  }, [isPressed])

  function close() {
    setIsPressed(false)
    ref.current = 0
  }

  return {
    items,
    isPressed,
    close,
    reloadItems: (tree) => {
      setItems(tree)
    },
  }
}
