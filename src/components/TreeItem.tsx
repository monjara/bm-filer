import FolderOpen from '@/icons/folder-open.svg?react'
import Folder from '@/icons/folder.svg?react'
import { useNavigateContext } from '@/providers/NavigateProvider'
import { usePerformContext } from '@/providers/PerformProvider'
import type { BMTreeNode } from '@/types/tree'
import getFavicon from '@/utils/getFavicon'
import isDir from '@/utils/isDir'

type Props = {
  item: BMTreeNode
  isOpen: boolean
  depth: number
}

export default function TreeItem({ item, isOpen, depth }: Props) {
  const { toggle } = usePerformContext()
  const { selectedId } = useNavigateContext()
  const isSelected = selectedId === item.id

  return (
    <div
      id={`d-${item.id}`}
      style={{
        paddingLeft: `${depth * 2}px`,
      }}
    >
      {isDir(item) ? (
        <div
          className={`folder ${isSelected && 'selected'}`}
          onClick={() => toggle(item.id)}
          onKeyUp={() => {}}
        >
          {isOpen ? <FolderOpen /> : <Folder />}
          <span>{item.title}</span>
        </div>
      ) : (
        <div
          className={`link ${isSelected && 'selected'}`}
          onClick={() => window.open(item.url, '_blank')}
          onKeyUp={() => {}}
        >
          <img
            src={getFavicon(item.url as string)}
            alt=''
            style={{ width: 16 }}
          />
          <span>{item.title}</span>
        </div>
      )}
    </div>
  )
}
