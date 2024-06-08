import { useContentContext } from '../provider/content-provider'
import Tree from './tree'
import TreeContent from './tree-content'
export default function BookmarkWindow() {
  const { items } = useContentContext()

  return (
    <div className='bm-filer-window'>
      <div className='bm-filer-list-container'>
        {items.map((item) => (
          <Tree key={item.id} item={item} markup={TreeContent} />
        ))}
      </div>
    </div>
  )
}
