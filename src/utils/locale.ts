export default function locale(key: string): string {
  return chrome.i18n.getMessage(key)
}
