import { shadowRoot } from '@/App'
import keys from '@/utils/keys'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateProvider } from './NavigateProvider'

const yankProvider = createContext({
  yankItem: undefined,
})

export const useYankContext = () => useContext(yankProvider)

export default function YankProvider({ children }) {
  const { flatItems } = useItemsContext()
  const { selectedId } = useNavigateProvider()
  const [yankItem, setYankItem] = useState(undefined)
  const yCount = useRef(0)

  useEffect(() => {
    let timer
    const handler = (e) => {
      if (e.key === keys.YANK) {
        yCount.current += 1
        if (yCount.current === 1) {
          timer = setTimeout(() => {
            yCount.current = 0
          }, 500)
        } else if (yCount.current === 2) {
          const yankItem = flatItems.find(
            (v) => String(v.id) === String(selectedId)
          )
          setYankItem(yankItem)
          yCount.current = 0
        }
      }
    }

    shadowRoot.addEventListener('keydown', handler)
    return () => {
      shadowRoot.removeEventListener('keydown', handler)
      clearTimeout(timer)
    }
  }, [flatItems, selectedId])

  return (
    <yankProvider.Provider
      value={{
        yankItem,
      }}
    >
      {children}
    </yankProvider.Provider>
  )
}
