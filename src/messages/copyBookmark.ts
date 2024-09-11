import type { BackgroundRequest } from '@/background/message'

export default async function copyBookmark(id: string): Promise<void> {
  await chrome.runtime
    .sendMessage<BackgroundRequest>({
      type: 'copy_bookmark',
      id,
    })
    .then((res) => res)
}
