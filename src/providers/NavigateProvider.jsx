import { shadowRoot } from '@/App'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useContext, useEffect, useState } from 'react'
import { useItemsContext } from './ItemsProvider'

const navigateProvider = createContext({
  selectedId: '',
  openLedger: {},
  recordFolderOpen: () => {},
  updateSelectedId: () => {},
  down: () => {},
})

export const useNavigateContext = () => useContext(navigateProvider)

export default function NavigateProvider({ children }) {
  const { idAccessor, flatItemIds } = useItemsContext()
  const [selectedId, setSelectedId] = useState(flatItemIds[0] || '')
  const [openLedger, setOpenLedger] = useState({})

  const recordFolderOpen = (id, isOpen) => {
    setOpenLedger((old) => ({
      ...old,
      [id]: isOpen,
    }))
  }

  const updateSelectedId = (id) => {
    setSelectedId(id)
  }

  const findLeftDir = (id) => {
    const parentId = idAccessor[id].parentDir
    if (parentId === '0') {
      return id
    }

    const isParentOpen = openLedger?.[parentId] ?? false
    if (isParentOpen) {
      return id
    }

    return findLeftDir(parentId)
  }

  const findRightDir = (id, origin) => {
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
  }

  const up = () => {
    const currentId = selectedId === '' ? flatItemIds[0] : selectedId
    const left = idAccessor[currentId].left
    const id = findLeftDir(left)
    setSelectedId(id)
  }

  const down = () => {
    const currentId = selectedId === '' ? flatItemIds[0] : selectedId
    const right = idAccessor[currentId].right
    const id = findRightDir(right, currentId)
    setSelectedId(id)
  }

  useEffect(() => {
    shadowRoot.getElementById('hidden_input')?.focus()

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

      shadowRoot.getElementById(`d-${selectedId}`)?.scrollIntoView({
        block: 'center',
      })
    }

    shadowRoot.addEventListener('keydown', handler, true)
    return () => {
      shadowRoot.removeEventListener('keydown', handler, true)
    }
  }, [selectedId, down, up])

  return (
    <navigateProvider.Provider
      value={{
        selectedId,
        openLedger,
        recordFolderOpen,
        updateSelectedId,
        down /** FIXME */,
      }}
    >
      {children}
    </navigateProvider.Provider>
  )
}
