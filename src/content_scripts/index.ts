import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'

window.addEventListener('keydown', handler)
window.addEventListener('message', (response) => {
  if (response.data.type === 'bm_close') {
    close()
  }
})

const [root, shadowRoot] = createRoot('bm-filer-root')
const iframe = createIframe('bm-filer-iframe')
shadowRoot.appendChild(iframe)

function iFrameHandler() {
  iframe.focus()
}

let count = 0
function handler(e: KeyboardEvent) {
  if (isInputTarget(e)) {
    return
  }

  if (e.key === keys.MODAL_OPEN) {
    count += 1

    setTimeout(() => {
      count = 0
    }, 1000)

    if (count === 2) {
      open()
      count = 0
    }
  } else {
    count = 0
  }
}

function open() {
  document.children[0].append(root)
  iframe.addEventListener('load', iFrameHandler)
}

function close() {
  if (document.children[0].contains(root)) {
    document.children[0].removeChild(root)
    iframe.removeEventListener('load', iFrameHandler)
  }
}

function createRoot(rootId: string) {
  const root = document.createElement('div')
  root.id = rootId
  root.style.position = 'fixed'
  root.style.top = '0'
  root.style.left = '0'
  root.style.width = '100vw'
  root.style.height = '100vh'
  root.style.zIndex = '9999999999'
  root.style.display = 'block'

  const shadowRoot = root.attachShadow({ mode: 'open' })
  return [root, shadowRoot]
}

function createIframe(id: string) {
  const iframe = document.createElement('iframe')
  iframe.id = id
  iframe.src = chrome.runtime.getURL('../../index.html')
  iframe.style.backgroundColor = 'transparent'
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.position = 'absolute'
  iframe.style.top = '0'
  iframe.style.left = '0'
  iframe.style.border = 'none'
  iframe.style.colorScheme = 'none'
  iframe.allowFullscreen = true
  return iframe
}
