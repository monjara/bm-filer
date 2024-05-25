import '@/content/content.css'
import { useRepeatKeys } from '@/hooks/useRepeatKeys'

function Content() {
  const { isPressed } = useRepeatKeys('s', 1000)

  if (!isPressed) {
    return null
  }

  return (
    <div className='bm-filer-content'>
      <h1>Vite + React</h1>
      <div className='card'>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Content
