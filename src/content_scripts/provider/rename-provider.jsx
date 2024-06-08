import keys from '@/utils/keys'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getBookmarks, updateBookmark } from '../utils/message'
import { useContentContext } from './content-provider'
import { useKeymapProvider } from './keymap-provider'

const renameProvider = createContext({
  oldTitle: '',
  isRename: false,
  update: async () => {},
  cancel: () => {},
})

export const useRenameContext = () => useContext(renameProvider)

export default function RenameProvider({ children }) {
  const { flatItems, reloadItems } = useContentContext()
  const { selectedId } = useKeymapProvider()
  const [isRename, setIsRename] = useState(false)
  const oldTitle = useRef('')

  useEffect(() => {
    const handler = (e) => {
      if (e.key === keys.RENAME) {
        oldTitle.current = flatItems.find(
          (v) => String(v.id) === String(selectedId)
        ).title
        setIsRename(true)
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [flatItems, selectedId])

  const update = async (newTitle) => {
    await updateBookmark(selectedId, newTitle)
    await getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
    setIsRename(false)
  }

  const cancel = () => {
    setIsRename(false)
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
