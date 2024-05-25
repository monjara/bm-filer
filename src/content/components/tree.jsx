import { useState } from 'react'

export default function Tree({ markup, items: node }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      {markup({ item: node, isOpen, setIsOpen })}
      {isOpen &&
        node.children?.map((child) => (
          <Tree key={child.id} markup={markup} items={child} />
        ))}
    </div>
  )
}
