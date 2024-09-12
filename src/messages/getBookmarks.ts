import type { BackgroundRequest } from '@/background/message'

export default async function getBookmarks() {
  return await chrome.runtime.sendMessage<BackgroundRequest>({
    type: 'get_bookmarks',
  })
}
