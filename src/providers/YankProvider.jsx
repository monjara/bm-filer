import useRepeatKeys from '@/hooks/useRepeatKeys'
import keys from '@/utils/keys'
import { copyBookmark } from '@/utils/message'
import { createContext, useCallback } from 'react'
import { useNavigateContext } from './NavigateProvider'

const yankProvider = createContext({
  yank: () => {},
})

export default function YankProvider({ children }) {
  const { selectedId } = useNavigateContext()

  useRepeatKeys(
    keys.YANK,
    () => {
      yank(selectedId)
    },
    { duration: 500 }
  )

  const yank = useCallback((id) => {
    copyBookmark(id)
  }, [])

  return <yankProvider.Provider value={{}}>{children}</yankProvider.Provider>
}
