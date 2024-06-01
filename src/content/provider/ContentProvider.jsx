import { useToggleListener } from '@/hooks/useToggleListener'
import { createContext, useContext } from 'react'

const contentContext = createContext({
  isPressed: false,
  items: [],
  flatItems: [],
})

export const useContentContext = () => useContext(contentContext)

export default function ContentProvider({ children }) {
  const value = useToggleListener('a', 1000)

  return (
    <contentContext.Provider value={value}>{children}</contentContext.Provider>
  )
}
