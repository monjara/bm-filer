import { createContext, useContext, useMemo, useState } from 'react'
import flatTree from '../utils/flatTree'
import { useContentContext } from './content-provider'

const keymapProvider = createContext({
  selectedId: '',
  up: () => {},
  down: () => {},
  manageOpen: () => {},
  updateSelectedId: () => {},
})

export const useKeymapProvider = () => useContext(keymapProvider)

export default function KeymapProvider({ children }) {
  const { items } = useContentContext()
  const flatItems = useMemo(() => flatTree(items), [items])
  const flatItemIds = useMemo(
    () => flatItems.map((item) => item.id),
    [flatItems]
  )

  const idMap = useMemo(
    () =>
      flatItems.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = {}
        }
        acc[item.id].prevDir = item.prevDir
        acc[item.id].nextDir = item.nextDir
        acc[item.id].parentDir = item.parentDir
        return acc
      }, {}),
    [flatItems]
  )

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

    if (!idMap?.[currentId]?.prevDir || openManager?.[currentId]) {
      const currentIndex = flatItemIds.indexOf(currentId)
      if (currentIndex > 0) {
        setSelectedId(flatItemIds[currentIndex - 1])
      } else {
        setSelectedId(idMap[currentId]?.parentDir || '')
      }
    } else {
      setSelectedId(idMap[currentId]?.prevDir || '')
    }
  }

  const down = () => {
    const length = flatItemIds.length
    const currentId = selectedId === '' ? flatItemIds[length - 1] : selectedId

    if (!idMap?.[currentId]?.nextDir || openManager?.[currentId]) {
      const currentIndex = flatItemIds.indexOf(currentId)
      if (currentIndex < length - 1) {
        setSelectedId(flatItemIds[currentIndex + 1])
      } else {
        setSelectedId(idMap[idMap[currentId]?.parentDir]?.nextDir || '')
      }
    } else {
      setSelectedId(idMap[currentId]?.nextDir || '')
    }
  }

  return (
    <keymapProvider.Provider
      value={{
        selectedId,
        up,
        down,
        manageOpen,
        updateSelectedId,
      }}
    >
      {children}
    </keymapProvider.Provider>
  )
}
