import { useEffect, useRef, useState } from 'react'

const ESC_KEY = 'Escape'
const INPUT_ELEMENTS = ['input', 'textarea', '[contenteditable]']

const isTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.target.closest(elm))
}

const flat = (items) => {
  let result = []

  if (Array.isArray(items)) {
    for (const item of items) {
      result = result.concat(flat(item))
    }
    return result
  }

  if (!items?.children) {
    result.push(items)
  } else {
    result.push(items)

    for (const child of items.children) {
      result = result.concat(flat(child))
    }
  }

  return result
}

export function useToggleListener(hotKey, duration = 1000) {
  const [items, setItems] = useState([])
  const [flatItems, setFlatItems] = useState([])
  const [isPressed, setIsPressed] = useState(false)
  const ref = useRef(0)

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

      if (e.key === ESC_KEY) {
        setIsPressed(false)
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
      const getBookmarks = async () => {
        const res = await chrome.runtime.sendMessage({ type: 'bookmarks' })
        setItems(res.tree)
        setFlatItems(flat(res.tree))
      }
      getBookmarks()
    }
  }, [isPressed])

  return {
    items,
    isPressed,
    flatItems,
  }
}
