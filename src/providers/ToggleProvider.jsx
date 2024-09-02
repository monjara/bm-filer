import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const toggleContext = createContext({
  open: false,
  close: () => {},
})

export const useToggleContext = () => useContext(toggleContext)

const DURATION = 1000

export default function ToggleProvider({ children }) {
  const [open, setOpen] = useState(true)
  const keyCount = useRef(0)

  //useEffect(() => {
  //  let timerId
  //  const handler = (e) => {
  //    if (isInputTarget(e)) {
  //      return
  //    }
  //
  //    if (e.key === keys.MODAL_OPEN) {
  //      keyCount.current += 1
  //      timerId = setTimeout(() => {
  //        keyCount.current = 0
  //      }, DURATION)
  //    }
  //    if (keyCount.current === 2) {
  //      const elm = document.children[0].querySelector('#bm-filer-root')
  //      console.log('elm: ', elm)
  //      setOpen(() => true)
  //      keyCount.current = 0
  //    }
  //
  //    if (e.key === keys.ESC) {
  //      close()
  //    }
  //  }
  //
  //  window.addEventListener('keydown', handler)
  //
  //  return () => {
  //    keyCount.current = 0
  //    clearTimeout(timerId)
  //    window.removeEventListener('keydown', handler)
  //  }
  //}, [])

  const close = () => {
    //setOpen(() => true)
    keyCount.current = 0
  }

  return (
    <toggleContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
    </toggleContext.Provider>
  )
}
