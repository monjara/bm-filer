import useRepeatKeys from '@/hooks/useRepeatKeys'
import useSingleKey from '@/hooks/useSingleKey'
import keys from '@/utils/keys'
import { getBookmarks, removeBookmark } from '@/utils/message'
import { createContext, useContext } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'

const cutContext = createContext({})

export const useCutContext = () => useContext(cutContext)

export default function CutProvider({ children }) {
  const { reloadItems } = useItemsContext()
  const { selectedId, down } = useNavigateContext()

  useRepeatKeys(keys.DELETE, () => {
    remove(selectedId)
  })

  useSingleKey(keys.CUT, () => {
    remove(selectedId)
  })

  const remove = async (id) => {
    down()
    await removeBookmark(id)
    getBookmarks().then((result) => {
      reloadItems(result.tree)
    })
  }

  return <cutContext.Provider value={{}}>{children}</cutContext.Provider>
}
