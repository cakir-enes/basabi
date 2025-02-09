import { atom, useAtom } from 'jotai'

// Define the sheet state atom
export const sheetAtom = atom<{ exercise: boolean; set: boolean }>({
  exercise: false,
  set: false,
})

type SheetKey = keyof typeof sheetAtom.init

export const useSheetManager = () => {
  const [sheets, setSheets] = useAtom(sheetAtom)

  const openSheet = (key: SheetKey) => {
    setSheets(prev => ({
      ...prev,
      [key]: true,
    }))
  }

  const closeSheet = (key: SheetKey) => {
    setSheets(prev => ({
      ...prev,
      [key]: false,
    }))
  }

  const toggleSheet = (key: SheetKey) => {
    setSheets(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const closeAllSheets = () => {
    setSheets({
      exercise: false,
      set: false,
    })
  }

  return {
    sheets,
    openSheet,
    closeSheet,
    toggleSheet,
    closeAllSheets,
  }
}
