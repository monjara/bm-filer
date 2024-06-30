import { useNavigateContext } from '@/providers/NavigateProvider'
import { usePerformContext } from '@/providers/PerformProvider'
import getFavicon from '@/utils/getFavicon'
import isDir from '@/utils/isDir'
import Folder from './Folder'
import FolderOpen from './FolderOpen'

export default function TreeContent({ item, isOpen, depth }) {
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
          className={`folder_row ${isSelected ? 'selected' : ''}`}
          onClick={() => toggle(item.id)}
          onKeyUp={() => {}}
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
