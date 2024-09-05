import { createContext, useContext, useState } from 'react'

const openProvider = createContext({
  openLedger: {},
})
const recordOpenProvider = createContext({
  recordFolderOpen: () => {},
})

export const useOpenContext = () => useContext(openProvider)
export const useRecordOpenContext = () => useContext(recordOpenProvider)

export default function OpenProvider({ children }) {
  const [openLedger, setOpenLedger] = useState({
    1: true,
  })

  const recordFolderOpen = (id) => {
    setOpenLedger((old) => ({
      ...old,
      [id]: !openLedger[id],
    }))
  }
  return (
    <openProvider.Provider value={{ openLedger }}>
      <recordOpenProvider.Provider value={{ recordFolderOpen }}>
        {children}
      </recordOpenProvider.Provider>
    </openProvider.Provider>
  )
}
