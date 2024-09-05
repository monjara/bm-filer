import FolderOpen from '@/icons/folder-open.svg?react'
import Folder from '@/icons/folder.svg?react'
import { useNavigateContext } from '@/providers/NavigateProvider'
import { usePerformContext } from '@/providers/PerformProvider'
import getFavicon from '@/utils/getFavicon'
import isDir from '@/utils/isDir'
import styles from './TreeItem.module.css'

export default function TreeItem({ item, isOpen, depth }) {
  const { toggle } = usePerformContext()
  const { selectedId } = useNavigateContext()
  const isSelected = selectedId === item.id

  return (
    <div
      style={{
        paddingLeft: `${depth * 2}px`,
      }}
    >
      {isDir(item) ? (
        <div
          className={`${styles.folder} ${isSelected && styles.selected}`}
          onClick={() => toggle(item.id)}
          onKeyUp={() => {}}
        >
          {isOpen ? <FolderOpen /> : <Folder />}
          <span>{item.title}</span>
        </div>
      ) : (
        <div
          className={`${styles.link} ${isSelected && styles.selected}`}
          onClick={() => window.open(item.url, '_blank')}
          onKeyUp={() => {}}
        >
          <img src={getFavicon(item.url)} alt='' style={{ width: 16 }} />
          <span>{item.title}</span>
        </div>
      )}
    </div>
  )
}
