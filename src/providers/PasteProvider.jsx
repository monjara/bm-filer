import useSingleKey from '@/hooks/useSingleKey'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { pasteBookmark } from '@/utils/message'
import { createContext, useContext } from 'react'
import { useItemsContext, useReloadItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const pasteContext = createContext({})

export const usePasteContext = () => useContext(pasteContext)

export default function PasteProvider({ children }) {
  const { flatItems } = useItemsContext()
  const { reloadItems } = useReloadItemsContext()
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
    reloadItems()
  }

  return <pasteContext.Provider value={{}}>{children}</pasteContext.Provider>
}
