import Tree from './Tree'
import TreeItem from './TreeItem'

export default function ListContainer({ items }) {
  return (
    <div className='list_container'>
      {items.map((item) => (
        <Tree key={item.id} item={item} markup={TreeItem} />
      ))}
    </div>
  )
}
