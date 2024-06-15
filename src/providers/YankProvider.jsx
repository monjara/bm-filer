import useRepeatKeys from '@/hooks/useRepeatKeys'
import keys from '@/utils/keys'
import { createContext, useContext, useState } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateProvider } from './NavigateProvider'

const yankProvider = createContext({
  yankItem: undefined,
})

export const useYankContext = () => useContext(yankProvider)

export default function YankProvider({ children }) {
  const { flatItems } = useItemsContext()
  const { selectedId } = useNavigateProvider()
  const [yankItem, setYankItem] = useState(undefined)

  useRepeatKeys(
    keys.YANK,
    () => {
      const yankItem = flatItems.find(
        (v) => String(v.id) === String(selectedId)
      )
      setYankItem(yankItem)
    },
    { duration: 500 }
  )

  return (
    <yankProvider.Provider
      value={{
        yankItem,
      }}
    >
      {children}
    </yankProvider.Provider>
  )
}
