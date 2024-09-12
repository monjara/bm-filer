import useSingleKey from '@/hooks/useSingleKey'
import pasteBookmark from '@/messages/pasteBookmark'
import type { BMTreeNode } from '@/types/tree'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { createContext } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'
import { useOpenContext } from './OpenProvider'

const pasteContext = createContext({})

type Props = {
  children: React.ReactNode
}

export default function PasteProvider({ children }: Props) {
  const { flatItems } = useItemsContext()
  const { selectedId } = useNavigateContext()
  const { openLedger } = useOpenContext()

  useSingleKey(keys.PASTE, () => {
    paste()
  })

  const paste = async () => {
    const current = flatItems.find(
      (v) => String(v.id) === String(selectedId)
    ) as BMTreeNode
    const isOpenDir = isDir(current) && openLedger?.[selectedId]
    const dist = isOpenDir
      ? { index: 0, parentId: selectedId }
      : {
          index: (current.index ?? 0) + 1,
          parentId: current.parentId ?? '1',
        }

    await pasteBookmark(dist)
  }

  return <pasteContext.Provider value={{}}>{children}</pasteContext.Provider>
}
