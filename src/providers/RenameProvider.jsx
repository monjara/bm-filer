import useSingleKey from '@/hooks/useSingleKey'
import updateBookmark from '@/messages/updateBookmarks'
import renameReducer, { renameInitialState } from '@/reducers/renameReducer'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useContext, useReducer } from 'react'
import { useCallback } from 'react'
import { useItemsContext, useReloadItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const renameStateProvider = createContext({
  oldTitle: '',
  isRename: false,
  update: async () => {},
  cancel: () => {},
})

export const useRenameContext = () => useContext(renameStateProvider)

export default function RenameProvider({ children }) {
  const { flatItems } = useItemsContext()
  const { reloadItems } = useReloadItemsContext()
  const { selectedId } = useNavigateContext()
  const [state, dispatch] = useReducer(renameReducer, renameInitialState)

  useSingleKey(keys.RENAME, (e) => {
    if (isTargetElement(e, ['#title'])) {
      return
    }

    dispatch({ type: 'START_RENAME', payload: { selectedId, flatItems } })
    e.preventDefault()
  })

  const update = useCallback(
    async (newTitle) => {
      await updateBookmark(selectedId, newTitle)
      reloadItems()
    },
    [selectedId, reloadItems]
  )

  const cancel = useCallback(() => {
    dispatch({ type: 'END_RENAME' })
  }, [])

  return (
    <renameStateProvider.Provider
      value={{
        ...state,
        update,
        cancel,
      }}
    >
      {children}
    </renameStateProvider.Provider>
  )
}
