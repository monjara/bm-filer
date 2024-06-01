import { useState } from 'react'
import { useKeymapProvider } from '../provider/keymap-provider'

export default function Tree({ markup, item, depth = 1 }) {
  const { manageOpen, updateSelectedId } = useKeymapProvider()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = (id) => {
    updateSelectedId(id)
    manageOpen(id, !isOpen)
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
