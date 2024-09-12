export default function getImage(src: string): string {
  return chrome.runtime.getURL(src)
}
