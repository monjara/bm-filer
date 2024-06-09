import { useItemsContext } from '@/providers/ItemsProvider'
import { isRelatedTargetElement } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useEffect, useRef } from 'react'
import RenamePortal from './RenamePortal'
import Tree from './Tree'
import TreeContent from './TreeContent'

export default function BookmarkWindow() {
  const { items, close } = useItemsContext()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const focusoutHandler = (e) => {
        if (!e?.sourceCapabilities && e.target === ref.current) {
          if (isRelatedTargetElement(e, ['#title'])) {
            return
          }
          close()
        } else {
          // ref.current.focus()
        }
      }
      const keyDownHandler = (e) => {
        if (e.key === keys.QUIT) {
          close()
        }
      }

      window.addEventListener('keydown', keyDownHandler)
      window.addEventListener('focusout', focusoutHandler)
      return () => {
        window.removeEventListener('keydown', keyDownHandler)
        window.removeEventListener('focusout', focusoutHandler)
      }
    }
  }, [close])

  return (
    <div className='bm-filer-cover'>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `<!--
To avoid conflicts with other extension (like vimium) key bindings, this input element gets focus.
If you have a better way to do this, please let me know.
https://chromewebstore.google.com/detail/bookmark-filer/akjhpafliijgbfigfmcngflcfdcpokfi
-->`,
        }}
      />
      <input
        ref={ref}
        id='hidden_input'
        type='text'
        style={{
          opacity: 0,
        }}
        onChange={() => {
          ref.current.value = ''
        }}
      />
      <div className='bm-filer-window'>
        <div className='bm-filer-list-container'>
          {items.map((item) => (
            <Tree key={item.id} item={item} markup={TreeContent} />
          ))}
        </div>
      </div>
      <RenamePortal />
    </div>
  )
}
