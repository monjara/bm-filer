import { setBookmarks } from './bookmark'
import { message } from './message'

chrome.runtime.onMessage.addListener(message)
chrome.runtime.onInstalled.addListener(setBookmarks)
chrome.bookmarks.onCreated.addListener(setBookmarks)
chrome.bookmarks.onRemoved.addListener(setBookmarks)
chrome.bookmarks.onChanged.addListener(setBookmarks)
chrome.bookmarks.onMoved.addListener(setBookmarks)
