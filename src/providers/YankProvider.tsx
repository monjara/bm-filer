import useRepeatKeys from '@/hooks/useRepeatKeys'
import copyBookmark from '@/messages/copyBookmark'
import keys from '@/utils/keys'
import { useCallback } from 'react'
import { useNavigateContext } from './NavigateProvider'

type Props = {
  children: React.ReactNode
}

export default function YankProvider({ children }: Props) {
  const { selectedId } = useNavigateContext()

  useRepeatKeys(
    keys.YANK,
    () => {
      yank(selectedId)
    },
    { duration: 500 }
  )

  const yank = useCallback((id: string) => {
    copyBookmark(id)
  }, [])

  return <>{children}</>
}
