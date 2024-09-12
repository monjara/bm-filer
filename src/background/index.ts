import { message } from './message'
import { resetTree } from './storage/tree'

chrome.runtime.onMessage.addListener(message)
chrome.runtime.onInstalled.addListener(initializeTree)
chrome.bookmarks.onCreated.addListener(refleshTree)
chrome.bookmarks.onRemoved.addListener(refleshTree)
chrome.bookmarks.onChanged.addListener(refleshTree)
chrome.bookmarks.onMoved.addListener(refleshTree)

function initializeTree() {
  resetTree()
}

function refleshTree() {
  resetTree({ withMessage: true })
}
