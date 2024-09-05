import useSingleKey from '@/hooks/useSingleKey'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { updateBookmark } from '@/utils/message'
import { createContext, useContext, useRef, useState } from 'react'
import { useItemsContext, useReloadItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const renameProvider = createContext({
  oldTitle: '',
  isRename: false,
  update: async () => {},
  cancel: () => {},
})

export const useRenameContext = () => useContext(renameProvider)

export default function RenameProvider({ children }) {
  const { flatItems } = useItemsContext()
  const { reloadItems } = useReloadItemsContext()
  const { selectedId } = useNavigateContext()
  const [isRename, setIsRename] = useState(false)
  const oldTitle = useRef('')

  useSingleKey(keys.RENAME, (e) => {
    if (isTargetElement(e, ['#title'])) {
      return
    }

    oldTitle.current = flatItems.find(
      (v) => String(v.id) === String(selectedId)
    ).title
    setIsRename(() => true)
    e.preventDefault()
  })

  const update = async (newTitle) => {
    await updateBookmark(selectedId, newTitle)
    reloadItems()
  }

  const cancel = () => {
    setIsRename(() => false)
  }

  return (
    <renameProvider.Provider
      value={{
        oldTitle: oldTitle.current,
        isRename,
        update,
        cancel,
      }}
    >
      {children}
    </renameProvider.Provider>
  )
}
