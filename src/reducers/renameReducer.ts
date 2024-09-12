import type { BMTreeNode } from '@/types/tree'

export const renameInitialState = {
  oldTitle: '',
  isRename: false,
}

type RenameState = typeof renameInitialState

type RenameAction = {
  type: 'START_RENAME' | 'END_RENAME'
  payload?: {
    selectedId: string
    flatItems: BMTreeNode[]
  }
}

export default function renameReducer(
  state: RenameState,
  action: RenameAction
): RenameState {
  switch (action.type) {
    case 'START_RENAME': {
      if (!action.payload) {
        return state
      }
      const { selectedId, flatItems } = action.payload
      const oldItem = flatItems.find((v) => String(v.id) === String(selectedId))
      if (!oldItem) {
        return state
      }
      const oldTitle = oldItem.title
      return {
        oldTitle,
        isRename: true,
      }
    }
    case 'END_RENAME':
      return {
        oldTitle: '',
        isRename: false,
      }
    default:
      return state
  }
}
