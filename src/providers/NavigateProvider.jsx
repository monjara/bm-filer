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

  const findAbove = useCallback(
    (id) => {
      const parentId = idAccessor[id].parentId
      if (parentId === '0') {
        return id
      }

      const isParentOpen = openLedger?.[parentId] ?? false
      if (isParentOpen) {
        return id
      }

      return findAbove(parentId)
    },
    [idAccessor, openLedger]
  )

  const findParentBelow = useCallback(
    (id) => {
      const stack = [id]
      let parent
      while (stack.length) {
        const current = stack.pop()
        if (current === '1') {
          return '2'
        }
        if (current === '2') {
          return '1'
        }
        parent = idAccessor[idAccessor[current].parentId]
        if (parent.isLast) {
          stack.push(parent.id)
        }
      }
      return parent.right
    },
    [idAccessor]
  )

  const findBelow = useCallback(
    (currentId) => {
      const stack = [currentId]
      let id
      while (stack.length) {
        const currentId = stack.pop()
        const currentItem = idAccessor[currentId]
        const isOpen = openLedger?.[currentId] ?? false
        const isLink = !!currentItem?.url

        // linkの場合
        //   最後の要素の場合、親ノードの下隣を取得
        //   それ以外の場合、下隣の要素を取得
        // directoryの場合
        //   開いている場合
        //     directoryが持つchildrenの最初の要素を取得
        //     childrenが空の場合、下隣の要素を取得
        //   閉じている場合
        //     最後の要素の場合、親ノードの下隣を取得
        //     それ以外の場合、下隣の要素を取得
        id = isLink
          ? currentItem.isLast
            ? findParentBelow(currentId)
            : currentItem.right
          : isOpen
            ? currentItem.below ?? currentItem.right
            : currentItem.isLast
              ? findParentBelow(currentId)
              : currentItem.right

        const parentId = idAccessor[id].parentId
        const isParentOpen = openLedger?.[parentId] ?? false
        if (parentId === '0') {
          return id
        }
        if (isParentOpen) {
          return id
        }
        stack.push(idAccessor[id].right)
      }
      return id
    },
    [idAccessor, openLedger, findParentBelow]
  )

  const up = useCallback(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const left = idAccessor[currentId].left
    const id = findAbove(left)
    setSelectedId(id)
  }, [selectedId, idAccessor, findAbove])

  const down = useCallback(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const id = findBelow(currentId)
    setSelectedId(id)
  }, [selectedId, findBelow])

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
