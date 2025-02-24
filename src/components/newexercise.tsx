import { useExercisesQuery } from '@/hooks/usePB'
import { ExercisesRecord } from '@/lib/pocketbase-types'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useMutation } from '@tanstack/react-query'
import { ChevronRightIcon } from 'lucide-react'
import { useParams } from 'react-router'
import { Input } from './ui/input'
import { SheetContent, SheetTitle } from './ui/sheet'
import { useSheetManager } from '@/hooks/useSheetManager'
import { useSetAtom } from 'jotai'
import { selectedExerciseAtom } from './newset'

export function NewExercise() {
  const exercisesQuery = useExercisesQuery()
  const { date } = useParams()
  const sheets = useSheetManager()
  const setEx = useSetAtom(selectedExerciseAtom)

  const onClick = (e: ExercisesRecord) => {
    setEx({ id: e.id, name: e.name })
    sheets.closeSheet('exercise')
    sheets.openSheet('set')
  }

  return (
    <SheetContent side='bottom' className='px-4 py-2'>
      <SheetTitle className='text-2xl'>New Exercise</SheetTitle>
      <Input type='text' placeholder='Search...' />
      <ScrollArea className='h-[70dvh] overflow-auto'>
        {exercisesQuery.data?.map((e) => (
          <div className='flex items-center w-full py-2 pl-1' onClick={() => onClick(e)}>
            <ChevronRightIcon />
            <div>{e.name}</div>
          </div>
        ))}
      </ScrollArea>
    </SheetContent>
  )
}
