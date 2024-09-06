export default async function updateBookmark(id, title) {
  await chrome.runtime
    .sendMessage({
      type: 'update_bookmark',
      id,
      title,
    })
    .then((res) => res)
}
