import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useItemsContext } from './ItemsProvider'
import { useOpenContext } from './OpenProvider'

const navigateProvider = createContext({
  selectedId: '',
  updateSelectedId: () => {},
})

export const useNavigateContext = () => useContext(navigateProvider)

export default function NavigateProvider({ children }) {
  const { idAccessor } = useItemsContext()
  const { openLedger } = useOpenContext()
  const [selectedId, setSelectedId] = useState('1')

  const updateSelectedId = (id) => {
    setSelectedId(id)
  }

  const findLeftDir = useCallback(
    (id) => {
      const parentId = idAccessor[id].parentDir
      if (parentId === '0') {
        return id
      }

      const isParentOpen = openLedger?.[parentId] ?? false
      if (isParentOpen) {
        return id
      }

      return findLeftDir(parentId)
    },
    [idAccessor, openLedger]
  )

  const findRightDir = useCallback(
    (id, origin) => {
      const parentId = idAccessor[id].parentDir
      if (parentId === '0') {
        return id
      }

      const isParentOpen = openLedger?.[parentId] ?? false
      if (isParentOpen) {
        if (id !== origin) {
          return id
        }
      }

      const right = idAccessor[id].right
      return findRightDir(right, origin)
    },
    [idAccessor, openLedger]
  )

  const up = useCallback(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const left = idAccessor[currentId].left
    const id = findLeftDir(left)
    setSelectedId(id)
  }, [selectedId, idAccessor, findLeftDir])

  const down = useCallback(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const right = idAccessor[currentId].right
    const id = findRightDir(right, currentId)
    setSelectedId(id)
  }, [selectedId, idAccessor, findRightDir])

  useEffect(() => {
    const handler = (e) => {
      if (isTargetElement(e, ['#title'])) {
        return
      }

      if (e.key === keys.DOWN || e.key === keys.ArrowDOWN) {
        down()
        e.stopPropagation()
      }
      if (e.key === keys.UP || e.key === keys.ArrowUP) {
        up()
        e.stopPropagation()
      }

      document.getElementById(`d-${selectedId}`)?.scrollIntoView({
        block: 'center',
      })
    }

    document.body.addEventListener('keydown', handler, true)
    return () => {
      document.body.removeEventListener('keydown', handler, true)
    }
  }, [selectedId, down, up])

  return (
    <navigateProvider.Provider
      value={{
        selectedId,
        updateSelectedId,
      }}
    >
      {children}
    </navigateProvider.Provider>
  )
}
