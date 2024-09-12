export default function getFavicon(siteUrl: string): string {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', siteUrl)
  url.searchParams.set('size', '64')
  return url.toString()
}
