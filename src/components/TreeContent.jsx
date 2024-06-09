import { shadowRoot } from '@/App'
import { useNavigateProvider } from '@/providers/NavigateProvider'
import getFavicon from '@/utils/getFavicon'
import isDir from '@/utils/isDir'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useEffect } from 'react'
import Folder from './Folder'
import FolderOpen from './FolderOpen'

export default function TreeContent({ item, isOpen, toggle, depth }) {
  const { selectedId } = useNavigateProvider()
  const isSelected = item.id === selectedId

  useEffect(() => {
    const handler = (e) => {
      if (isTargetElement(e, ['#title'])) {
        return
      }

      if (e.key === keys.ENTER || e.key === keys.OPEN) {
        if (isSelected) {
          if (item?.url) {
            window.open(item.url, '_blank')
          } else {
            toggle(item.id)
          }
        }
      }
    }

    shadowRoot.addEventListener('keydown', handler)
    return () => {
      shadowRoot.removeEventListener('keydown', handler)
    }
  }, [toggle, item, isSelected])

  return (
    <div
      id={`d-${item.id}`}
      style={{
        paddingLeft: `${depth * 2}px`,
      }}
    >
      {isDir(item) ? (
        <div
          className={`folder_row ${isSelected ? 'selected' : ''}`}
          onClick={() => toggle(item.id)}
          onKeyUp={() => toggle(item.id)}
        >
          {isOpen ? <FolderOpen /> : <Folder />}
          <span>{item.title}</span>
        </div>
      ) : (
        <a
          className={`link_row d-${depth} ${isSelected ? 'selected' : ''}`}
          href={item.url}
        >
          <img src={getFavicon(item.url)} alt='' style={{ width: 16 }} />
          <span>{item.title}</span>
        </a>
      )}
    </div>
  )
}
