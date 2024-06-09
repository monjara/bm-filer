import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { createContext, useContext, useEffect, useState } from 'react'
import { useContentContext } from './content-provider'

const keymapProvider = createContext({
  selectedId: '',
  manageOpen: () => {},
  updateSelectedId: () => {},
})

export const useKeymapProvider = () => useContext(keymapProvider)

export default function KeymapProvider({ children }) {
  const { idAccessor, flatItemIds } = useContentContext()
  const [selectedId, setSelectedId] = useState(flatItemIds[0] || '')
  const [openManager, setOpenManager] = useState({})

  const manageOpen = (id, isOpen) => {
    setOpenManager((old) => ({
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

    const isParentOpen = openManager?.[parentId] ?? false
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

    const isParentOpen = openManager?.[parentId] ?? false
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
    document.getElementById('hidden_input')?.focus()

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

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [selectedId, down, up])

  return (
    <keymapProvider.Provider
      value={{
        selectedId,
        manageOpen,
        updateSelectedId,
      }}
    >
      {children}
    </keymapProvider.Provider>
  )
}
