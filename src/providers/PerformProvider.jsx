import { shadowRoot } from '@/App'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useCallback, useContext, useEffect } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const performContext = createContext({
  toggle: () => {},
})

export const usePerformContext = () => useContext(performContext)

export default function PerformProvider({ children }) {
  const { idAccessor } = useItemsContext()
  const { selectedId, updateSelectedId, recordFolderOpen } =
    useNavigateContext()
  const item = idAccessor[selectedId]

  const toggle = useCallback(
    (id) => {
      updateSelectedId(id)
      recordFolderOpen(id)
      // setIsOpen((old) => !old)
    },
    [updateSelectedId, recordFolderOpen]
  )

  useEffect(() => {
    const handler = (e) => {
      if (isTargetElement(e, ['#title'])) {
        return
      }

      if (e.key === keys.ENTER || e.key === keys.OPEN) {
        if (item?.url) {
          window.open(item.url, '_blank')
        } else {
          toggle(item.id)
        }
      }
    }

    shadowRoot.addEventListener('keydown', handler)
    return () => {
      shadowRoot.removeEventListener('keydown', handler)
    }
  }, [toggle, item])

  return (
    <performContext.Provider
      value={{
        toggle,
      }}
    >
      {children}
    </performContext.Provider>
  )
}
