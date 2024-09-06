import getBookmarks from '@/messages/getBookmarks'
import flatTree from '@/utils/flatTree'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const itemsContext = createContext({
  items: [],
  flatItems: [],
  idAccessor: {},
})
const reloadItemsContext = createContext({
  reloadItems: () => {},
})

export const useItemsContext = () => useContext(itemsContext)
export const useReloadItemsContext = () => useContext(reloadItemsContext)

export default function ItemsProvider({ children }) {
  const [items, setItems] = useState([])
  const flatItems = useMemo(() => flatTree(items), [items])

  const idAccessor = useMemo(() => {
    const length = flatItems.length
    return flatItems.reduce((acc, item, index) => {
      const prevIndex = index > 0 ? index - 1 : length - 1
      const nextIndex = index < length - 1 ? index + 1 : 0
      const isLast = flatItems[nextIndex]?.index === 0

      if (!acc[item.id]) {
        acc[item.id] = {}
      }
      acc[item.id].id = item.id
      acc[item.id].url = item?.url
      acc[item.id].prevDir = item.prevDir
      acc[item.id].nextDir = item.nextDir
      acc[item.id].left = flatItems[prevIndex]?.id
      acc[item.id].right = flatItems[nextIndex]?.id
      acc[item.id].below = item?.children?.[0]?.id
      acc[item.id].parentId = item.parentId
      acc[item.id].isFirst = item.index === 0
      acc[item.id].isLast = isLast
      return acc
    }, {})
  }, [flatItems])

  useEffect(() => {
    getBookmarks().then((result) => {
      setItems(result.tree)
    })
  }, [])

  const reloadItems = useCallback(() => {
    getBookmarks().then((result) => {
      setItems(result.tree)
    })
  }, [])

  return (
    <itemsContext.Provider
      value={{
        items,
        flatItems,
        idAccessor,
      }}
    >
      <reloadItemsContext.Provider
        value={{
          reloadItems,
        }}
      >
        {children}
      </reloadItemsContext.Provider>
    </itemsContext.Provider>
  )
}
