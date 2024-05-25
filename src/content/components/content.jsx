import { useRepeatKeys } from '@/hooks/useRepeatKeys'
import { useLayoutEffect, useState } from 'react'
import Tree from './tree'

function Content() {
  const [tree, setTree] = useState([])
  const { isPressed } = useRepeatKeys('s', 1000)

  useLayoutEffect(() => {
    const getBookmarks = async () => {
      const res = await chrome.runtime.sendMessage({ type: 'bookmarks' })
      setTree(res.tree)
    }
    getBookmarks()
  }, [])

  if (!isPressed) {
    return null
  }

  return (
    <div className='bm-filer-content'>
      <div className='bm-filer-list-wrapper'>
        <div className='bm-filer-list-container'>
          {tree.map((node) => (
            <Tree key={node.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Content
