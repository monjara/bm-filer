import { useItemsContext } from '@/providers/ItemsProvider'
import styles from './BookmarkWindow.module.css'
import ListContainer from './ListContainer'
import RenamePortal from './RenamePortal'

export default function BookmarkWindow() {
  const { items } = useItemsContext()

  return (
    <>
      <div id='bm-filer-cover' className={styles.cover}>
        <div className={styles.modal}>
          <ListContainer items={items} />
        </div>
        <RenamePortal />
      </div>
    </>
  )
}
