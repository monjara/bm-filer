import { createContext, useCallback, useContext, useState } from 'react'

const openProvider = createContext<{
  openLedger: { [key: string]: boolean }
}>({
  openLedger: {},
})
const recordOpenProvider = createContext<{
  recordFolderOpen: (id: string) => void
}>({
  recordFolderOpen: () => {},
})

export const useOpenContext = () => useContext(openProvider)
export const useRecordOpenContext = () => useContext(recordOpenProvider)

type Props = {
  children: React.ReactNode
}

export default function OpenProvider({ children }: Props) {
  const [openLedger, setOpenLedger] = useState<{ [key: string]: boolean }>({
    '1': true,
  })

  const recordFolderOpen = useCallback<(id: string) => void>(
    (id) => {
      setOpenLedger((old) => ({
        ...old,
        [id]: !openLedger[id],
      }))
    },
    [openLedger]
  )

  return (
    <openProvider.Provider value={{ openLedger }}>
      <recordOpenProvider.Provider value={{ recordFolderOpen }}>
        {children}
      </recordOpenProvider.Provider>
    </openProvider.Provider>
  )
}
