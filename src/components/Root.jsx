import Tree from './Tree'
import TreeItem from './TreeItem'

export default function Root({ items }) {
  return (
    <div className='bm-filer-list-container'>
      {items.map((item) => (
        <Tree key={item.id} item={item} markup={TreeItem} />
      ))}
    </div>
  )
}
