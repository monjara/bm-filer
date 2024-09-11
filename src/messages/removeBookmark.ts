import type { BackgroundRequest } from '@/background/message'

export default async function removeBookmark(id: string) {
  await chrome.runtime
    .sendMessage<BackgroundRequest>({
      type: 'remove_bookmark',
      id,
    })
    .then((res) => res)
}
