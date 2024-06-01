import { useState } from 'react'

export default function Tree({ markup, item, depth = 1 }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen((old) => !old)
  }

  return (
    <div>
      {markup({ item, isOpen, toggle, depth })}
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
