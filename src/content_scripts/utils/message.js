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
