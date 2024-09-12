import type { BMTreeNode } from '@/types/tree'
import flatTree from '@/utils/flatTree'

export type Accessable = {
  id: string
  url?: string
  prevDir?: string | undefined
  nextDir?: string | undefined
  left: string
  right: string
  below?: string | undefined
  parentId?: string | undefined
  isFirst: boolean
  isLast: boolean
}

type KeyAccessor = {
  [key: string]: Accessable
}

type ItemState = {
  items: BMTreeNode[]
  flatItems: BMTreeNode[]
  idAccessor: KeyAccessor
}

export const itemsInitialState: ItemState = {
  items: [],
  flatItems: [],
  idAccessor: {},
}

type ItemActionType = 'SET_ITEMS'

export type ItemAction = {
  type: ItemActionType
  payload: BMTreeNode[]
}

export default function itemsReducer(
  state: ItemState,
  action: ItemAction
): ItemState {
  switch (action.type) {
    case 'SET_ITEMS': {
      const flatItems = flatTree(action.payload) as BMTreeNode[]
      const length = flatItems.length
      const idAccessor = flatItems.reduce((acc: KeyAccessor, item, index) => {
        if (!item) {
          return acc
        }
        const prevIndex = index > 0 ? index - 1 : length - 1
        const nextIndex = index < length - 1 ? index + 1 : 0

        if (!acc[item.id]) {
          acc[item.id] = {} as Accessable
        }
        acc[item.id].id = item.id
        acc[item.id].url = item?.url
        acc[item.id].prevDir = item.prevDir
        acc[item.id].nextDir = item.nextDir
        acc[item.id].left = flatItems[prevIndex]?.id
        acc[item.id].right = flatItems[nextIndex]?.id
        acc[item.id].below = item?.children?.[0]?.id
        acc[item.id].parentId = item.parentId
        acc[item.id].isFirst = item.index === 0
        acc[item.id].isLast = flatItems[nextIndex]?.index === 0
        return acc
      }, {})

      return {
        items: action.payload,
        flatItems,
        idAccessor,
      }
    }
    default:
      return state
  }
}
