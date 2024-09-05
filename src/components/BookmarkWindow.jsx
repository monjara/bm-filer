import styles from '@/App.css?inline'
import { useItemsContext } from '@/providers/ItemsProvider'
import RenamePortal from './RenamePortal'
import Root from './Root'

export default function BookmarkWindow() {
  const { items } = useItemsContext()

  return (
    <>
      <div id='bm-filer-cover' className='bm-filer-cover'>
        <div className='bm-filer-window'>
          <Root items={items} />
        </div>
        <RenamePortal />
      </div>
      <style>{styles}</style>
    </>
  )
}
