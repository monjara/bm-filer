import { useEffect, useState } from 'react'
import { useContentContext } from '../provider/ContentProvider'
import Tree from './tree'
import TreeContent from './tree-content'

const UP_KEY = 'k'
const DOWN_KEY = 'j'

export default function BookmarkWindow() {
  const { items } = useContentContext()
  const [selected, setSelected] = useState({
    parentId: '0',
    index: 0,
  })

  const setParentId = (id) => {
    setSelected({ index: 0, parentId: id })
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === DOWN_KEY) {
        setSelected((old) => ({
          ...old,
          index: old.index + 1,
        }))
      }
      if (e.key === UP_KEY) {
        setSelected((old) => ({
          ...old,
          index: old.index - 1,
        }))
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <div className='bm-filer-window'>
      <div className='bm-filer-list-container'>
        {items.map((item) => (
          <Tree
            key={item.id}
            items={item}
            markup={TreeContent}
            selected={selected}
            setParentId={setParentId}
          />
        ))}
      </div>
    </div>
  )
}
