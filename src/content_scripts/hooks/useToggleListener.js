import keys from '@/utils/keys'
import { useEffect, useRef, useState } from 'react'

const INPUT_ELEMENTS = ['input', 'textarea', '[contenteditable]']

const isTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.target.closest(elm))
}

export function useToggleListener(hotKey, duration = 1000) {
  const [items, setItems] = useState([])
  const [isPressed, setIsPressed] = useState(false)
  const ref = useRef(0)

  const close = () => {
    setIsPressed(false)
    ref.current = 0
  }

  useEffect(() => {
    let timerId
    const handler = (e) => {
      const isInputTarget = isTargetElement(e, INPUT_ELEMENTS)
      if (isInputTarget) {
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
  }, [hotKey, duration, close])

  useEffect(() => {
    if (isPressed) {
      const getBookmarks = async () => {
        const res = await chrome.runtime.sendMessage({ type: 'bookmarks' })
        setItems(res.tree)
      }
      getBookmarks()
    }
  }, [isPressed])

  return {
    items,
    isPressed,
    close,
  }
}
