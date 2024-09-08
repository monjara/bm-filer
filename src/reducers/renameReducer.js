export const renameInitialState = {
  oldTitle: '',
  isRename: false,
}

export default function renameReducer(state, action) {
  switch (action.type) {
    case 'START_RENAME': {
      const { selectedId, flatItems } = action.payload
      const oldTitle = flatItems.find(
        (v) => String(v.id) === String(selectedId)
      ).title
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
