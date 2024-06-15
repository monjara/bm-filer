export const getBookmarks = async () => {
  return await chrome.runtime.sendMessage({ type: 'get_bookmarks' })
}

export const updateBookmark = async (id, title) => {
  await chrome.runtime
    .sendMessage({
      type: 'update_bookmark',
      id,
      title,
    })
    .then((res) => {
      return res
    })
}

export const moveBookmark = async (id, distIndex, distParentId) => {
  await chrome.runtime
    .sendMessage({
      type: 'move_bookmark',
      id,
      distIndex,
      distParentId,
    })
    .then((res) => {
      return res
    })
}
