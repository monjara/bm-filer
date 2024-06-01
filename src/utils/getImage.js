/**
 * Get the image path
 * @param {string} src The image path
 * @returns {string} The image path
 */
export default function getImage(src) {
  return chrome.runtime.getURL(src)
}
