import useRepeatKeys from '@/hooks/useRepeatKeys'
import useSingleKey from '@/hooks/useSingleKey'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { getBookmarks, removeBookmark } from '@/utils/message'
import { createContext, useContext } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const cutContext = createContext({})

export const useCutContext = () => useContext(cutContext)

export default function CutProvider({ children }) {
  const { flatItems, idAccessor, reloadItems } = useItemsContext()
  const { selectedId, updateSelectedId } = useNavigateContext()

  useRepeatKeys(keys.DELETE, () => {
    remove(selectedId)
  })

  useSingleKey(keys.CUT, () => {
    remove(selectedId)
  })

  const remove = async (id) => {
    const current = flatItems.find((item) => item.id === id)
    let right = isDir(current) ? idAccessor[id].nextDir : idAccessor[id].right
    if (right === id) {
      right = idAccessor[current.parentId].nextDir
    }
    updateSelectedId(right)

    await removeBookmark(id)
    getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
  }

  return <cutContext.Provider value={{}}>{children}</cutContext.Provider>
}
