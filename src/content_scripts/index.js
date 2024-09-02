import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'

let count = 0
window.addEventListener('keydown', handler)

const root = document.createElement('div')
root.id = 'bm-filer-root'
root.style.position = 'fixed'
root.style.top = '0'
root.style.left = '0'
root.style.width = '100vw'
root.style.height = '100vh'
root.style.zIndex = '9999999999'
root.style.display = 'block'

export const shadowRoot = root.attachShadow({ mode: 'open' })

const iframe = document.createElement('iframe')
iframe.id = 'bm-filer-iframe'
iframe.src = chrome.runtime.getURL('../../index.html')
iframe.allowtransparency = true
iframe.style.width = '100%'
iframe.style.height = '100%'
iframe.position = 'absolute'
iframe.style.top = '0'
iframe.style.left = '0'
iframe.style.border = 'none'
iframe.style.colorScheme = 'none'
iframe.is = 'x-frame-bypass'
iframe.allowFullscreen = true
shadowRoot.appendChild(iframe)

function handler(e) {
  if (isInputTarget(e)) {
    return
  }
  const iFrameHandler = () => {
    iframe.focus()
  }

  if (e.key === keys.MODAL_OPEN) {
    count += 1

    setTimeout(() => {
      count = 0
    }, 1000)

    if (count === 2) {
      document.children[0].append(root)
      document.body.blur()
      iframe.addEventListener('load', iFrameHandler)
      count = 0
    }
  } else {
    count = 0
  }

  if (e.key === keys.ESC || e.key === keys.QUIT) {
    if (document.children[0].contains(root)) {
      document.children[0].removeChild(root)
      iframe.removeEventListener('load', iFrameHandler)
    }
  }
}
