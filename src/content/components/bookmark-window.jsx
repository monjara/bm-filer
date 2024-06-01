import { useEffect } from 'react'
import { useContentContext } from '../provider/ContentProvider'
import { useKeymapProvider } from '../provider/KeymapProvider'
import Tree from './tree'
import TreeContent from './tree-content'

const UP_KEY = 'k'
const DOWN_KEY = 'j'

export default function BookmarkWindow() {
  const { items } = useContentContext()
  const { up, down } = useKeymapProvider()

  useEffect(() => {
    const handler = (e) => {
      if (e.key === DOWN_KEY) {
        down(true)
      }
      if (e.key === UP_KEY) {
        up()
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [down, up])

  return (
    <div className='bm-filer-window'>
      <div className='bm-filer-list-container'>
        {items.map((item) => (
          <Tree key={item.id} item={item} markup={TreeContent} />
        ))}
      </div>
    </div>
  )
}
