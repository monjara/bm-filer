import flatTree from '@/utils/flatTree'

export const itemsInitialState = {
  items: [],
  flatItems: [],
  idAccessor: {},
}

export default function itemsReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS': {
      const flatItems = flatTree(action.payload)
      const length = flatItems.length
      const idAccessor = flatItems.reduce((acc, item, index) => {
        const prevIndex = index > 0 ? index - 1 : length - 1
        const nextIndex = index < length - 1 ? index + 1 : 0

        if (!acc[item.id]) {
          acc[item.id] = {}
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
