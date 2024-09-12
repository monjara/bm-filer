import type { BackgroundRequest } from '@/background/message'

export default async function pasteBookmark({
  index,
  parentId,
}: { index: number; parentId: string }) {
  await chrome.runtime
    .sendMessage<BackgroundRequest>({
      type: 'paste_bookmark',
      index,
      parentId,
    })
    .then((res) => res)
}
