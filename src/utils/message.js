import returnResult from './returnResult'

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
    .then(returnResult)
}

export const copyBookmark = async (id) => {
  await chrome.runtime
    .sendMessage({
      type: 'copy_bookmark',
      id,
    })
    .then(returnResult)
}

export const removeBookmark = async (id) => {
  await chrome.runtime
    .sendMessage({
      type: 'remove_bookmark',
      id,
    })
    .then(returnResult)
}

export const pasteBookmark = async ({
  index: distIndex,
  parentId: distParentId,
}) => {
  await chrome.runtime
    .sendMessage({
      type: 'paste_bookmark',
      distIndex,
      distParentId,
    })
    .then(returnResult)
}
