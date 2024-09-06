export default async function pasteBookmark({ index, parentId }) {
  await chrome.runtime
    .sendMessage({
      type: 'paste_bookmark',
      index,
      parentId,
    })
    .then((res) => res)
}
