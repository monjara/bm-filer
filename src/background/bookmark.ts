import type { BMTreeNode } from '@/types/tree'
import { getRegister, setRegister } from './storage/register'
import { getTree, resetTree } from './storage/tree'

export async function getBookmarks() {
  return await getTree()
}

type BookmarkCreateArg = chrome.bookmarks.BookmarkCreateArg

export async function createBookmark({
  index,
  parentId,
  fromRegister = true,
}: BookmarkCreateArg & { fromRegister: boolean }): Promise<void> {
  if (fromRegister) {
    const { register } = await getRegister()
    createRecursion({ item: register, parentId, index })
  }
}

function createRecursion({
  item,
  parentId,
  index,
}: BookmarkCreateArg & { item: BMTreeNode }): void {
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
        if (item.children) {
          for (const child of item.children) {
            createRecursion({
              item: child,
              parentId: result.id,
              index: child.index ?? 0,
            })
          }
        }
      }
    )
  }
}

export async function updateBookmark(id: string, title: string): Promise<void> {
  await chrome.bookmarks.update(id, { title }).then(() => {
    resetTree()
  })
}

export async function copyBookmark(id: string): Promise<void> {
  await chrome.bookmarks.getSubTree(id).then(setRegister)
}

export async function removeBookmark(id: string): Promise<void> {
  await copyBookmark(id)
  await chrome.bookmarks.removeTree(id).then(() => {
    resetTree()
  })
}
