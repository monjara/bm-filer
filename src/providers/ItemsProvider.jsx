import getBookmarks from '@/messages/getBookmarks'
import itemsReducer, { itemsInitialState } from '@/reducers/itemsReducer'
import { useReducer } from 'react'
import { createContext, useCallback, useContext, useEffect } from 'react'

const itemsContext = createContext(itemsInitialState)
const reloadItemsContext = createContext({
  reloadItems: () => {},
})

export const useItemsContext = () => useContext(itemsContext)
export const useReloadItemsContext = () => useContext(reloadItemsContext)

export default function ItemsProvider({ children }) {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState)

  useEffect(() => {
    getBookmarks().then((result) => {
      dispatch({ type: 'SET_ITEMS', payload: result.tree })
    })
  }, [])

  const reloadItems = useCallback(() => {
    getBookmarks().then((result) => {
      dispatch({ type: 'SET_ITEMS', payload: result.tree })
    })
  }, [])

  return (
    <itemsContext.Provider value={{ ...state }}>
      <reloadItemsContext.Provider
        value={{
          reloadItems,
        }}
      >
        {children}
      </reloadItemsContext.Provider>
    </itemsContext.Provider>
  )
}
