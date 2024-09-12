import { useOpenContext } from '@/providers/OpenProvider'
import type { BMTreeNode } from '@/types/tree'

type MarkupProps = {
  item: BMTreeNode
  isOpen: boolean
  depth: number
}

type Props = {
  markup: (props: MarkupProps) => React.ReactNode
  item: BMTreeNode
  depth?: number | undefined
}
export default function Tree({ markup, item, depth = 1 }: Props) {
  const { openLedger } = useOpenContext()
  const isOpen = openLedger?.[item.id]

  return (
    <div>
      {markup({ item, isOpen, depth })}
      {isOpen &&
        item.children?.map((child) => (
          <Tree
            key={child.id}
            markup={markup}
            item={child}
            depth={depth + 10}
          />
        ))}
    </div>
  )
}
