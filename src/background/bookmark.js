import { getRegister, setRegister } from './storage/register'
import { getTree, resetTree } from './storage/tree'

export async function getBookmarks() {
  return await getTree()
}

export async function createBookmark({ index, parentId, fromRegister = true }) {
  if (fromRegister) {
    const { register } = await getRegister()
    createRecursion(register, parentId, index)
  }
}

function createRecursion(item, parentId, index) {
  if (!item.children) {
    chrome.bookmarks.create({
      parentId,
      index,
      title: item.title,
      url: item.url,
    })
  } else {
    chrome.bookmarks.create(
      {
        parentId,
        index,
        title: item.title,
      },
      (result) => {
        for (const child of item.children) {
          createRecursion(child, result.id, child.index)
        }
      }
    )
  }
}

export async function updateBookmark(id, title) {
  await chrome.bookmarks.update(id, { title }).then(() => {
    resetTree()
  })
}

export async function copyBookmark(id) {
  await chrome.bookmarks.getSubTree(id).then(setRegister)
}

export async function removeBookmark(id) {
  await copyBookmark(id)
  await chrome.bookmarks.removeTree(id).then(() => {
    resetTree()
  })
}
