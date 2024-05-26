import { useState } from 'react'

export default function Tree({ markup, items: node, depth = 1 }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      {markup({ item: node, isOpen, setIsOpen, depth })}
      {isOpen &&
        node.children?.map((child) => (
          <Tree
            key={child.id}
            markup={markup}
            items={child}
            depth={depth + 10}
          />
        ))}
    </div>
  )
}
