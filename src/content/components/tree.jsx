import { useState } from 'react'

export default function Tree({
  markup,
  items: node,
  selected,
  setParentId,
  depth = 1,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = (parentId) => {
    setParentId(parentId)
    setIsOpen((old) => !old)
  }

  return (
    <div>
      {markup({ item: node, isOpen, toggle, selected, depth })}
      {isOpen &&
        node.children?.map((child) => (
          <Tree
            key={child.id}
            markup={markup}
            items={child}
            selected={selected}
            setParentId={setParentId}
            depth={depth + 10}
          />
        ))}
    </div>
  )
}
