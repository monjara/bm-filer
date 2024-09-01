import { shadowRoot } from '@/App'
import { useItemsContext } from '@/providers/ItemsProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import { isRelatedTargetElement } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useCallback, useEffect, useRef } from 'react'
import RenamePortal from './RenamePortal'
import Root from './Root'

export default function BookmarkWindow() {
  const { close } = useToggleContext()
  const { items } = useItemsContext()
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

      shadowRoot.addEventListener('keydown', keyDownHandler, true)
      shadowRoot.addEventListener('focusout', focusoutHandler, true)
      return () => {
        shadowRoot.removeEventListener('keydown', keyDownHandler, true)
        shadowRoot.removeEventListener('focusout', focusoutHandler, true)
      }
    }
  }, [close])

  const onClick = useCallback((e) => {
    if (e.target.id === 'bm-filer-cover') {
      close()
    }
  }, [close])

  return (
    <div
      id='bm-filer-cover'
      className='bm-filer-cover'
      onClick={onClick}
      onKeyDown={onClick}
    >
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
        <Root items={items} />
      </div>
      <RenamePortal />
    </div>
  )
}
