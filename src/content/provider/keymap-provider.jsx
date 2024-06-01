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

  const up = () => {
    const currentId = selectedId === '' ? flatItemIds[0] : selectedId

    if (!idAccessor?.[currentId]?.prevDir || openManager?.[currentId]) {
      const currentIndex = flatItemIds.indexOf(currentId)
      if (currentIndex > 0) {
        setSelectedId(flatItemIds[currentIndex - 1])
      } else {
        setSelectedId(idAccessor[currentId]?.parentDir || '')
      }
    } else {
      setSelectedId(idAccessor[currentId]?.prevDir || '')
    }
  }

  const down = () => {
    const length = flatItemIds.length
    const currentId = selectedId === '' ? flatItemIds[length - 1] : selectedId

    if (!idAccessor?.[currentId]?.nextDir || openManager?.[currentId]) {
      const currentIndex = flatItemIds.indexOf(currentId)
      if (currentIndex < length - 1) {
        setSelectedId(flatItemIds[currentIndex + 1])
      } else {
        setSelectedId(
          idAccessor[idAccessor[currentId]?.parentDir]?.nextDir || ''
        )
      }
    } else {
      setSelectedId(idAccessor[currentId]?.nextDir || '')
    }
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
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [down, up])

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
