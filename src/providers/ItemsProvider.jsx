import flatTree from '@/utils/flatTree'
import { getBookmarks } from '@/utils/message'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const itemsContext = createContext({
  items: [],
  flatItems: [],
  idAccessor: {},
  reloadItems: () => {},
})

export const useItemsContext = () => useContext(itemsContext)

export default function ItemsProvider({ children }) {
  const [items, setItems] = useState([])
  console.log('items: ', items)
  const flatItems = useMemo(() => flatTree(items), [items])

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
    getBookmarks().then((result) => {
      setItems(result.tree)
    })
  }, [])

  const reloadItems = (tree) => {
    setItems(tree)
  }

  return (
    <itemsContext.Provider
      value={{
        items,
        flatItems,
        idAccessor,
        reloadItems,
      }}
    >
      {children}
    </itemsContext.Provider>
  )
}
