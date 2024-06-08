import flatTree from '@/utils/flatTree'
import { createContext, useContext, useMemo } from 'react'
import { useToggleListener } from '../hooks/useToggleListener'

const contentContext = createContext({
  isPressed: false,
  items: [],
  flatItems: [],
  flatItemIds: [],
  idAccessor: {},
  close: () => {},
})

export const useContentContext = () => useContext(contentContext)

export default function ContentProvider({ children }) {
  const { items, isPressed, close } = useToggleListener('a', 1000)

  const flatItems = useMemo(() => flatTree(items), [items])
  const flatItemIds = useMemo(
    () => flatItems.map((item) => item.id),
    [flatItems]
  )

  const idAccessor = useMemo(() => {
    const length = flatItems.length
    return flatItems.reduce((acc, item, index) => {
      const prevIndex = index > 0 ? index - 1 : length - 1
      const nextIndex = index < length - 1 ? index + 1 : 0

      if (!acc[item.id]) {
        acc[item.id] = {}
      }
      acc[item.id].prevDir = item.prevDir
      acc[item.id].nextDir = item.nextDir
      acc[item.id].parentDir = item.parentId
      acc[item.id].left = flatItems[prevIndex].id
      acc[item.id].right = flatItems[nextIndex].id
      return acc
    }, {})
  }, [flatItems])

  return (
    <contentContext.Provider
      value={{
        items,
        flatItems,
        flatItemIds,
        idAccessor,
        isPressed,
        close,
      }}
    >
      {children}
    </contentContext.Provider>
  )
}
