export function getImage(src) {
  return chrome.runtime.getURL(src)
}
