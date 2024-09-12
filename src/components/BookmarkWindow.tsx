import { useItemsContext } from '@/providers/ItemsProvider'
import ListContainer from './ListContainer'
import RenamePortal from './RenamePortal'

export default function BookmarkWindow() {
  const { items } = useItemsContext()

  return (
    <>
      <div id='bm-filer-cover' className='cover'>
        <div className='modal'>
          <ListContainer items={items} />
        </div>
        <RenamePortal />
      </div>
    </>
  )
}
