import useSingleKey from '@/hooks/useSingleKey'
import updateBookmark from '@/messages/updateBookmarks'
import renameReducer, { renameInitialState } from '@/reducers/renameReducer'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useCallback, useContext, useReducer } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const renameStateProvider = createContext<{
  oldTitle: string
  isRename: boolean
  update: (newTitle: string) => void
  cancel: () => void
}>({
  oldTitle: '',
  isRename: false,
  update: () => {},
  cancel: () => {},
})

export const useRenameContext = () => useContext(renameStateProvider)

type Props = {
  children: React.ReactNode
}

export default function RenameProvider({ children }: Props) {
  const { flatItems } = useItemsContext()
  const { selectedId } = useNavigateContext()
  const [state, dispatch] = useReducer(renameReducer, renameInitialState)

  useSingleKey(keys.RENAME, (e) => {
    if (isTargetElement(e, ['#title'])) {
      return
    }

    dispatch({ type: 'START_RENAME', payload: { selectedId, flatItems } })
    e.preventDefault()
  })

  const update = useCallback<(newTitle: string) => void>(
    async (newTitle) => {
      await updateBookmark(selectedId, newTitle)
    },
    [selectedId]
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
