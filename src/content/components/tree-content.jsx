import FolderOpenIcon from '@/assets/folder-open.svg'
import FolderIcon from '@/assets/folder.svg'
import getFavicon from '@/utils/getFavicon'
import getImage from '@/utils/getImage'
import { useEffect } from 'react'
import { useKeymapProvider } from '../provider/KeymapProvider'

export default function TreeContent({ item, isOpen, toggle, depth }) {
  const { selectedId } = useKeymapProvider()
  const isSelected = item.id === selectedId

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === 'l') {
        if (isSelected) {
          if (item?.url) {
            window.open(item.url, '_blank')
          } else {
            toggle(item.id)
          }
        }
      }
    }

    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [toggle, item, isSelected])

  return (
    <div
      id={`d-${item.id}`}
      style={{
        paddingLeft: `${depth * 2}px`,
      }}
    >
      {item.children ? (
        <div
          className={`folder-row ${isSelected ? 'selected' : ''}`}
          onClick={() => toggle(item.parentId)}
          onKeyUp={() => toggle(item.parentId)}
        >
          {isOpen ? (
            <img src={getImage(FolderOpenIcon)} alt='folder-open' />
          ) : (
            <img src={getImage(FolderIcon)} alt='folder' />
          )}
          <span>{item.title}</span>
        </div>
      ) : (
        <a
          className={`link-row d-${depth} ${isSelected ? 'selected' : ''}`}
          href={item.url}
        >
          <img src={getFavicon(item.url)} alt='' style={{ width: 16 }} />
          <span>{item.title}</span>
        </a>
      )}
    </div>
  )
}
