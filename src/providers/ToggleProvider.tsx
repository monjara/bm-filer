import { isInputTarget } from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function ToggleProvider({ children }: Props) {
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (isInputTarget(e)) {
        return
      }

      if (e.key === keys.ESC || e.key === keys.QUIT) {
        close()
      }
    }
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.id === 'bm-filer-cover') {
        close()
      }
    }

    window.addEventListener('keydown', keydownHandler)
    window.addEventListener('click', clickHandler)
    return () => {
      window.removeEventListener('keydown', keydownHandler)
      window.removeEventListener('click', clickHandler)
    }
  }, [])

  const close = () => {
    window.parent.postMessage({ type: 'bm_close' }, '*')
  }

  return <>{children}</>
}
