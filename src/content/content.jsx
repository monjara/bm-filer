import reactLogo from '@/assets/react.svg'
import { useRepeatKeys } from '@/hooks/useRepeatKeys'
import '@/popup/App.css'
import { useState } from 'react'
import viteLogo from '/vite.svg'

function Content() {
  const { isPressed } = useRepeatKeys('s', 1000)
  const [count, setCount] = useState(0)

  if (!isPressed) {
    return null
  }

  const getImage = (src) => {
    return chrome.runtime.getURL(src)
  }

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={getImage(viteLogo)} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img
            src={getImage(reactLogo)}
            className='logo react'
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button type='button' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Content
