import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { getBookmarks, updateBookmark } from '@/utils/message'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateProvider } from './NavigateProvider'

const renameProvider = createContext({
  oldTitle: '',
  isRename: false,
  update: async () => {},
  cancel: () => {},
})

export const useRenameContext = () => useContext(renameProvider)

export default function RenameProvider({ children }) {
  const { flatItems, reloadItems } = useItemsContext()
  const { selectedId } = useNavigateProvider()
  const [isRename, setIsRename] = useState(false)
  const oldTitle = useRef('')

  useEffect(() => {
    const handler = (e) => {
      if (e.key === keys.RENAME) {
        if (isTargetElement(e, ['#title'])) {
          return
        }

        oldTitle.current = flatItems.find(
          (v) => String(v.id) === String(selectedId)
        ).title
        setIsRename(() => true)
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [flatItems, selectedId])

  const update = async (newTitle) => {
    await updateBookmark(selectedId, newTitle)
    getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
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
