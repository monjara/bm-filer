import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useCallback, useContext, useEffect } from 'react'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'
import { useRecordOpenContext } from './OpenProvider'

const performContext = createContext<{
  toggle: (id: string) => void
}>({
  toggle: () => {},
})

export const usePerformContext = () => useContext(performContext)

type Props = {
  children: React.ReactNode
}
export default function PerformProvider({ children }: Props) {
  const { idAccessor } = useItemsContext()
  const { selectedId, updateSelectedId } = useNavigateContext()
  const { recordFolderOpen } = useRecordOpenContext()
  const item = idAccessor[selectedId]

  const toggle = useCallback(
    (id: string) => {
      updateSelectedId(id)
      recordFolderOpen(id)
      // setIsOpen((old) => !old)
    },
    [updateSelectedId, recordFolderOpen]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isTargetElement(e, ['#title'])) {
        return
      }

      if (e.key === keys.ENTER || e.key === keys.OPEN) {
        if (item?.url) {
          window.open(item.url, '_blank')
        } else {
          toggle(item.id)
        }
      }
    }

    document.body.addEventListener('keydown', handler)
    return () => {
      document.body.removeEventListener('keydown', handler)
    }
  }, [toggle, item])

  return (
    <performContext.Provider
      value={{
        toggle,
      }}
    >
      {children}
    </performContext.Provider>
  )
}
