import useRepeatKeys from '@/hooks/useRepeatKeys'
import useSingleKey from '@/hooks/useSingleKey'
import removeBookmark from '@/messages/removeBookmark'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { createContext } from 'react'
import { useItemsContext, useReloadItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'
import { useRenameContext } from './RenameProvider'

const cutContext = createContext({})

export default function CutProvider({ children }) {
  const { flatItems, idAccessor } = useItemsContext()
  const { reloadItems } = useReloadItemsContext()
  const { selectedId, updateSelectedId } = useNavigateContext()
  const { isRename } = useRenameContext()

  useRepeatKeys(keys.DELETE, () => {
    remove(selectedId)
  })

  useSingleKey(keys.CUT, () => {
    remove(selectedId)
  })

  const remove = async (id) => {
    if (isRename) {
      return
    }
    const current = flatItems.find((item) => item.id === id)
    let right = isDir(current) ? idAccessor[id].nextDir : idAccessor[id].right
    if (right === id) {
      right = idAccessor[current.parentId].nextDir
    }
    updateSelectedId(right)

    await removeBookmark(id)
    reloadItems()
  }

  return <cutContext.Provider value={{}}>{children}</cutContext.Provider>
}
