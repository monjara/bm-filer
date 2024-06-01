import { useToggleListener } from '@/hooks/useToggleListener'
import { createContext, useContext, useMemo } from 'react'
import flatTree from '../utils/flatTree'

const contentContext = createContext({
  isPressed: false,
  items: [],
  flatItems: [],
  flatItemIds: [],
  idAccessor: {},
})

export const useContentContext = () => useContext(contentContext)

export default function ContentProvider({ children }) {
  const { items, isPressed } = useToggleListener('a', 1000)

  const flatItems = useMemo(() => flatTree(items), [items])
  const flatItemIds = useMemo(
    () => flatItems.map((item) => item.id),
    [flatItems]
  )

  const idAccessor = useMemo(
    () =>
      flatItems.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = {}
        }
        acc[item.id].prevDir = item.prevDir
        acc[item.id].nextDir = item.nextDir
        acc[item.id].parentDir = item.parentDir
        return acc
      }, {}),
    [flatItems]
  )

  return (
    <contentContext.Provider
      value={{
        items,
        flatItems,
        flatItemIds,
        idAccessor,
        isPressed,
      }}
    >
      {children}
    </contentContext.Provider>
  )
}
