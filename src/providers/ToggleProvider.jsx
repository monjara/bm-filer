import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useContext, useEffect } from 'react'

const toggleContext = createContext({
  close: () => {},
})

export const useToggleContext = () => useContext(toggleContext)

export default function ToggleProvider({ children }) {
  useEffect(() => {
    const handler = (e) => {
      if (isInputTarget(e)) {
        return
      }

      if (e.key === keys.ESC || e.key === keys.QUIT) {
        close()
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])

  const close = () => {
    window.parent.postMessage({ type: 'bm_close' }, '*')
  }

  return (
    <toggleContext.Provider
      value={{
        close,
      }}
    >
      {children}
    </toggleContext.Provider>
  )
}
