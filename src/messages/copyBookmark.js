export default async function copyBookmark(id) {
  await chrome.runtime
    .sendMessage({
      type: 'copy_bookmark',
      id,
    })
    .then((res) => res)
}
