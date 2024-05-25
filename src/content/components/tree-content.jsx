export default function TreeContent({ item, isOpen, setIsOpen }) {
  return (
    <div>
      {item.children && (
        <button type='button' onClick={() => setIsOpen(!isOpen)}>
          <span>{isOpen ? 'v' : '>'}</span>
        </button>
      )}
      {item.url ? (
        <a href={item.url}>{item.title}</a>
      ) : (
        <span>{item.title}</span>
      )}
    </div>
  )
}
