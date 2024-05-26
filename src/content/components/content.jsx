import { useRepeatKeys } from '@/hooks/useRepeatKeys'
import { useEffect, useState } from 'react'
import Tree from './tree'
import TreeContent from './tree-content'

export default function Content() {
  const [tree, setTree] = useState([])
  const { isPressed } = useRepeatKeys('s', 1000)

  useEffect(() => {
    if (isPressed) {
      const getBookmarks = async () => {
        const res = await chrome.runtime.sendMessage({ type: 'bookmarks' })
        setTree(res.tree)
      }
      getBookmarks()
    }
  }, [isPressed])

  if (!isPressed) {
    return null
  }

  return (
    <div className='bm-filer-window'>
      <div className='bm-filer-list-container'>
        {tree.map((node) => (
          <Tree key={node.id} items={node} markup={TreeContent} />
        ))}
      </div>
    </div>
  )
}
