import flatTree from '@/utils/flatTree'
import { getBookmarks } from '@/utils/message'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useToggleContext } from './ToggleProvider'

const itemsContext = createContext({
  items: [],
  flatItems: [],
  flatItemIds: [],
  idAccessor: {},
  reloadItems: () => {},
})

export const useItemsContext = () => useContext(itemsContext)

export default function ItemsProvider({ children }) {
  const { open } = useToggleContext()
  const [items, setItems] = useState([])
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
      acc[item.id].id = item.id
      acc[item.id].url = item?.url
      acc[item.id].prevDir = item.prevDir
      acc[item.id].nextDir = item.nextDir
      acc[item.id].parentDir = item.parentId
      acc[item.id].left = flatItems[prevIndex].id
      acc[item.id].right = flatItems[nextIndex].id
      return acc
    }, {})
  }, [flatItems])

  useEffect(() => {
    if (open) {
      getBookmarks().then((result) => {
        setItems(result.tree)
      })
    }
  }, [open])

  const reloadItems = (tree) => {
    setItems(tree)
  }

  return (
    <itemsContext.Provider
      value={{
        items,
        flatItems,
        flatItemIds,
        idAccessor,
        reloadItems,
      }}
    >
      {children}
    </itemsContext.Provider>
  )
}
