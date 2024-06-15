import useSingleKey from '@/hooks/useSingleKey'
import keys from '@/utils/keys'
import { getBookmarks, moveBookmark } from '@/utils/message'
import { createContext, useContext } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateProvider } from './NavigateProvider'
import { useYankContext } from './YankProvider'

const pasteContext = createContext({})

export const usePasteContext = () => useContext(pasteContext)

export default function PasteProvider({ children }) {
  const { flatItems, reloadItems } = useItemsContext()
  const { selectedId, updateSelectedId } = useNavigateProvider()
  const { yankItem } = useYankContext()

  useSingleKey(keys.PASTE, (_event) => {
    const dist = flatItems.find((v) => String(v.id) === String(selectedId))
    move(yankItem.id, {
      index: dist.index + 1,
      parentId: dist.parentId,
    })
  })

  const move = async (id, { index, parentId }) => {
    await moveBookmark(id, index, parentId)
    getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
    updateSelectedId(yankItem.id)
  }

  return <pasteContext.Provider value={{}}>{children}</pasteContext.Provider>
}
