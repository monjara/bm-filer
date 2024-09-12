import getBookmarks from '@/messages/getBookmarks'
import itemsReducer, { itemsInitialState } from '@/reducers/itemsReducer'
import type { BMTreeNode } from '@/types/tree'
import { createContext, useContext, useEffect, useReducer } from 'react'

const itemsContext = createContext(itemsInitialState)

export const useItemsContext = () => useContext(itemsContext)

type Props = {
  children: React.ReactNode
}

export default function ItemsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState)

  useEffect(() => {
    getBookmarks().then((result) => {
      dispatch({ type: 'SET_ITEMS', payload: result.tree })
    })
  }, [])

  useEffect(() => {
    const listener = ({ type, tree }: { type: string; tree: BMTreeNode[] }) => {
      if (type === 'reset_tree') {
        dispatch({ type: 'SET_ITEMS', payload: tree })
      }
      return true
    }
    chrome.runtime.onMessage.addListener(listener)
    return () => {
      chrome.runtime.onMessage.removeListener(listener)
    }
  }, [])

  return (
    <itemsContext.Provider value={{ ...state }}>
      {children}
    </itemsContext.Provider>
  )
}
