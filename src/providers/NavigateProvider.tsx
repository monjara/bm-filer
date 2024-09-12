import type { Accessable } from '@/reducers/itemsReducer'
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

const navigateProvider = createContext<{
  selectedId: string
  updateSelectedId: (id: string) => void
}>({
  selectedId: '',
  updateSelectedId: () => {},
})

export const useNavigateContext = () => useContext(navigateProvider)

type Props = {
  children: React.ReactNode
}
export default function NavigateProvider({ children }: Props) {
  const { idAccessor, flatItems } = useItemsContext()
  const { openLedger } = useOpenContext()
  const [selectedId, setSelectedId] = useState<string>('1')

  const updateSelectedId = (id: string) => {
    setSelectedId(id)
  }

  const findChildBelow = useCallback<(id: string) => string>(
    (id) => {
      const stack = [id]
      while (stack.length) {
        const id = stack.pop() as string

        const isLink = !!idAccessor[id]?.url
        if (isLink) {
          return id
        }
        const isOpen = openLedger?.[id] ?? false
        if (!isOpen) {
          return id
        }
        const childLast = flatItems.find(
          (item) => item.parentId === id && idAccessor[item.id].isLast
        )
        if (!childLast) {
          return id
        }
        stack.push(childLast.id)
      }
      return id
    },
    [openLedger, flatItems, idAccessor]
  )

  const findAbove = useCallback<(id: string) => string>(
    (currentId) => {
      const current = idAccessor[currentId]
      const isFirst = current.isFirst
      const prevIsDir =
        current.prevDir !== undefined && !idAccessor[current.prevDir]?.url

      return isFirst
        ? current.id === '1'
          ? findChildBelow('2')
          : (current.parentId as string)
        : prevIsDir
          ? findChildBelow(current.left)
          : current.left
    },
    [idAccessor, findChildBelow]
  )

  const findParentBelow = useCallback<(id: string) => string>(
    (id) => {
      const stack = [id]
      let parent: Accessable | undefined = undefined
      while (stack.length) {
        const current = stack.pop() as string
        if (current === '1') {
          return '2'
        }
        if (current === '2') {
          return '1'
        }
        parent = idAccessor[idAccessor[current].parentId as string]
        if (parent.isLast) {
          stack.push(parent.id)
        }
      }
      if (!parent || !parent.right) {
        return '1'
      }
      return parent.right
    },
    [idAccessor]
  )

  const findBelow = useCallback<(id: string) => string>(
    (currentId) => {
      const stack = [currentId]
      let id = '1'
      while (stack.length) {
        const currentId = stack.pop() as string
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
        const isParentOpen =
          (parentId !== undefined && openLedger?.[parentId]) ?? false
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

  const up = useCallback<VoidFunction>(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const id = findAbove(currentId)
    setSelectedId(id)
  }, [selectedId, findAbove])

  const down = useCallback<VoidFunction>(() => {
    const currentId = selectedId === '' ? '1' : selectedId
    const id = findBelow(currentId)
    setSelectedId(id)
  }, [selectedId, findBelow])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
        behavior: 'smooth',
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
