import { useItemsContext } from '@/providers/ItemsProvider'
import { useToggleContext } from '@/providers/ToggleProvider'
import { useCallback } from 'react'
import RenamePortal from './RenamePortal'
import Root from './Root'

export default function BookmarkWindow() {
  const { close } = useToggleContext()
  const { items } = useItemsContext()

  const onClick = useCallback(
    (e) => {
      if (e.target.id === 'bm-filer-cover') {
        close()
      }
    },
    [close]
  )

  return (
    <div
      id='bm-filer-cover'
      className='bm-filer-cover'
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className='bm-filer-window'>
        <Root items={items} />
      </div>
      <RenamePortal />
    </div>
  )
}
