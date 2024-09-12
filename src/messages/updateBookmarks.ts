import type { BackgroundRequest } from '@/background/message'

export default async function updateBookmark(id: string, title: string) {
  await chrome.runtime
    .sendMessage<BackgroundRequest>({
      type: 'update_bookmark',
      id,
      title,
    })
    .then((res) => res)
}
