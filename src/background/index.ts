import { message } from './message'
import { resetTree } from './storage/tree'

chrome.runtime.onMessage.addListener(message)
chrome.runtime.onInstalled.addListener(resetTree)
chrome.bookmarks.onCreated.addListener(resetTree)
chrome.bookmarks.onRemoved.addListener(resetTree)
chrome.bookmarks.onChanged.addListener(resetTree)
chrome.bookmarks.onMoved.addListener(resetTree)
