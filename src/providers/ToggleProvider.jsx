import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useEffect } from 'react'

const toggleContext = createContext({})

export default function ToggleProvider({ children }) {
  useEffect(() => {
    const keydownHandler = (e) => {
      if (isInputTarget(e)) {
        return
      }

      if (e.key === keys.ESC || e.key === keys.QUIT) {
        close()
      }
    }
    const clickHandler = (e) => {
      if (e.target.id === 'bm-filer-cover') {
        close()
      }
    }

    window.addEventListener('keydown', keydownHandler)
    window.addEventListener('click', clickHandler)
    return () => {
      window.removeEventListener('keydown', keydownHandler)
      window.removeEventListener('click', clickHandler)
    }
  }, [])

  const close = () => {
    window.parent.postMessage({ type: 'bm_close' }, '*')
  }

  return <toggleContext.Provider value={{}}>{children}</toggleContext.Provider>
}
