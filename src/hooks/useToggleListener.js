import isDir from '@/content/utils/isDir'
import { useEffect, useRef, useState } from 'react'

const ESC_KEY = 'Escape'
const INPUT_ELEMENTS = ['input', 'textarea', '[contenteditable]']

const isTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.target.closest(elm))
}

function prepareTree(items) {
  const length = items.length
  for (let i = 0; i < length; i++) {
    if (isDir(items[i])) {
      const prev = i === 0 ? items[length - 1] : items[i - 1]
      const next = i === length - 1 ? items[0] : items[i + 1]
      items[i].prevDir = prev.id
      items[i].nextDir = next.id
      prepareTree(items[i].children)
    }
  }
  return items
}

export function useToggleListener(hotKey, duration = 1000) {
  const [items, setItems] = useState([])
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
        setItems(prepareTree(res.tree))
      }
      getBookmarks()
    }
  }, [isPressed])

  return {
    items,
    isPressed,
  }
}
