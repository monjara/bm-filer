function Tree({ node, depth = 0 }) {
  if (!node.children) {
    return null
  }
  const marginLeft = `${depth * 10}px`

  return (
    <div>
      {node.children.map((child) => (
        <div key={child.id} className='tree-row'>
          {child.url ? (
            <div className='tree-row-link' style={{ marginLeft }}>
              <img
                alt='favicon'
                src={`http://www.google.com/s2/favicons?domain=${child.url}`}
                style={{
                  width: '20px',
                }}
              />
              <a href={child.url}>{child.title}</a>
            </div>
          ) : (
            <div style={{ marginLeft }}>
              <div>{child.title}</div>
            </div>
          )}
          <Tree node={child} depth={depth + 1} />
        </div>
      ))}
    </div>
  )
}

export default Tree
