export default async function removeBookmark(id) {
  await chrome.runtime
    .sendMessage({
      type: 'remove_bookmark',
      id,
    })
    .then((res) => res)
}
