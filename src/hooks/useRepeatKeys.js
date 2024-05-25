import { useEffect, useRef, useState } from 'react'

const ESC_KEY = 'Escape'
const INPUT_ELEMENTS = ['input', 'textarea', '[contenteditable]']

const isTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.target.closest(elm))
}

export function useRepeatKeys(hotKey, duration = 1000) {
  const [isPressed, setIsPressed] = useState(false)
  const ref = useRef(0)

  useEffect(() => {
    let timerId
    const handler = (e) => {
      if (e.key === ESC_KEY) {
        setIsPressed(false)
      }

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
    }

    document.addEventListener('keydown', handler)

    return () => {
      ref.current = 0
      clearTimeout(timerId)
      document.removeEventListener('keydown', handler)
    }
  }, [hotKey, duration])

  return {
    isPressed,
  }
}
