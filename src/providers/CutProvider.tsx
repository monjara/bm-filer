import useRepeatKeys from '@/hooks/useRepeatKeys'
import useSingleKey from '@/hooks/useSingleKey'
import removeBookmark from '@/messages/removeBookmark'
import isDir from '@/utils/isDir'
import keys from '@/utils/keys'
import { useItemsContext } from './ItemsProvider'
import { useNavigateContext } from './NavigateProvider'
import { useRenameContext } from './RenameProvider'

type Props = {
  children: React.ReactNode
}
export default function CutProvider({ children }: Props) {
  const { flatItems, idAccessor } = useItemsContext()
  const { selectedId, updateSelectedId } = useNavigateContext()
  const { isRename } = useRenameContext()

  useRepeatKeys(keys.DELETE, () => {
    remove(selectedId)
  })

  useSingleKey(keys.CUT, () => {
    remove(selectedId)
  })

  const remove = async (id: string) => {
    if (isRename) {
      return
    }
    const current = flatItems.find((item) => item.id === id)
    let right =
      current && isDir(current) ? idAccessor[id].nextDir : idAccessor[id].right
    if (right === id && current?.parentId) {
      right = idAccessor[current.parentId].nextDir
    }
    if (right) {
      updateSelectedId(right)
    }

    await removeBookmark(id)
  }

  return <>{children}</>
}
