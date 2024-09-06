export default async function getBookmarks() {
  return await chrome.runtime.sendMessage({ type: 'get_bookmarks' })
}
