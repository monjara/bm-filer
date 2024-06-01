import { createContext, useContext, useMemo, useRef, useState } from 'react'
import flatTree from '../utils/flatTree'
import { useContentContext } from './ContentProvider'

const keymapProvider = createContext({
  selectedId: '',
  up: () => {},
  down: () => {},
})

export const useKeymapProvider = () => useContext(keymapProvider)

export default function KeymapProvider({ children }) {
  const { items } = useContentContext()
  const flatItemIds = useMemo(() => flatTree(items), [items])
  const [selectedId, setSelectedId] = useState(flatItemIds[0] || '')

  const up = () => {
    const currentIndex = flatItemIds.indexOf(
      selectedId === '' ? flatItemIds[0] : selectedId
    )
    if (currentIndex > 0) {
      setSelectedId(flatItemIds[currentIndex - 1])
    } else {
      setSelectedId(flatItemIds[flatItemIds.length - 1])
    }
  }

  const down = (isOpen) => {
    if (isOpen) {
      const length = flatItemIds.length
      const currentIndex = flatItemIds.indexOf(
        selectedId === '' ? flatItemIds[length - 1] : selectedId
      )
      if (currentIndex < length - 1) {
        setSelectedId(flatItemIds[currentIndex + 1])
      } else {
        setSelectedId(flatItemIds[0])
      }
    } else {
    }
  }

  return (
    <keymapProvider.Provider
      value={{
        selectedId,
        up,
        down,
      }}
    >
      {children}
    </keymapProvider.Provider>
  )
}
