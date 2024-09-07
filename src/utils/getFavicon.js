/**
 * Get the favicon of a website.
 * @param {string} siteUrl The URL of the website.
 * @returns {string} The URL of the favicon.
 */
export default function getFavicon(siteUrl) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', siteUrl)
  url.searchParams.set('size', '64')
  return url.toString()
}
