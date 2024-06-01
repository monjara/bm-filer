import { createContext, useContext, useEffect, useState } from 'react'
import { useContentContext } from './content-provider'

const UP_KEY = 'k'
const DOWN_KEY = 'j'

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
    const handler = (e) => {
      switch (e.key) {
        case DOWN_KEY:
          down()
          break
        case UP_KEY:
          up()
          break
        default:
          break
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
