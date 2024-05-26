import { getFavicon } from '@/utils/getFavicon'
import FolderIcon from './folder-icon'
import FolderOpenIcon from './folder-open-icon'

export default function TreeContent({ item, isOpen, setIsOpen, depth }) {
  return (
    <div
      style={{
        paddingLeft: `${depth * 2}px`,
      }}
    >
      {item.children ? (
        <div
          className='folder-row'
          onClick={() => setIsOpen(!isOpen)}
          onKeyUp={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FolderOpenIcon /> : <FolderIcon />}
          <span>{item.title}</span>
        </div>
      ) : (
        <a className='link-row' href={item.url}>
          <img src={getFavicon(item.url)} alt='' style={{ width: 16 }} />
          <span>{item.title}</span>
        </a>
      )}
    </div>
  )
}
