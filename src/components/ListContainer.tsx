import type { BMTreeNode } from '@/types/tree'
import Tree from './Tree'
import TreeItem from './TreeItem'

type Props = {
  items: BMTreeNode[]
}

export default function ListContainer({ items }: Props) {
  return (
    <div className='list_container'>
      {items.map((item) => (
        <Tree key={item.id} item={item} markup={TreeItem} />
      ))}
    </div>
  )
}
