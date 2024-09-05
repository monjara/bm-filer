import { useOpenContext } from '@/providers/OpenProvider'

export default function Tree({ markup, item, depth = 1 }) {
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
