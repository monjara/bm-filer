import useSingleKey from '@/hooks/useSingleKey'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { getBookmarks, pasteBookmark } from '@/utils/message'
import { createContext, useContext } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const pasteContext = createContext({})

export const usePasteContext = () => useContext(pasteContext)

export default function PasteProvider({ children }) {
  const { flatItems, reloadItems } = useItemsContext()
  const { selectedId, openLedger } = useNavigateContext()

  useSingleKey(keys.PASTE, (_event) => {
    paste()
  })

  const paste = async () => {
    const current = flatItems.find((v) => String(v.id) === String(selectedId))
    const isOpenDir = isDir(current) && openLedger?.[selectedId]
    const dist = isOpenDir
      ? { index: 0, parentId: selectedId }
      : { index: current.index + 1, parentId: current.parentId }

    await pasteBookmark(dist)
    getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
  }

  return <pasteContext.Provider value={{}}>{children}</pasteContext.Provider>
}
