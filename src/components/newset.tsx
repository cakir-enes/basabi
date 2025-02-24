import { Input } from './ui/input'
import { SheetContent, SheetFooter, SheetTitle } from './ui/sheet'
import { useSheetManager } from '@/hooks/useSheetManager'
import { atom, useAtomValue } from 'jotai'
import { Button } from './ui/button'
import { DumbbellIcon, HashIcon } from 'lucide-react'
import { useState } from 'react'
import { useNewSetMutation } from '@/hooks/useNewSetMutation'

export type ExerciseData = {
  id: string
  name: string
  // ... other exercise data
}

export const selectedExerciseAtom = atom<ExerciseData | null>(null)

export function NewSet() {
  const ex = useAtomValue(selectedExerciseAtom)
  const sheets = useSheetManager()
  const [weight, setWeight] = useState<number>(0)
  const [reps, setReps] = useState<number>(0)

  const newSetMut = useNewSetMutation()

  return (
    <SheetContent side='bottom' className='px-4 py-2'>
      <SheetTitle className='text-2xl'>New Set / {ex?.name}</SheetTitle>
      <div className='flex justify-center items-center gap-2 text-2xl '>
        <Input
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          left={<DumbbellIcon className='size-6!' />}
          type='number'
          placeholder='Weight'
          className='w-[40dvw] h-[4ch]'
        />
        <div className='w-0.5 h-8 bg-foreground/40' />
        <Input
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          left={<HashIcon />}
          type='number'
          placeholder='Reps'
          className='w-[40dvw] h-[4ch] '
        />
      </div>
      <SheetFooter>
        <Button
          onClick={() => {
            newSetMut.mutateAsync(
              { weight, reps, exercise: ex!.id },
              {
                onSuccess: () => {
                  sheets.closeSheet('set')
                },
              },
            )
          }}
        >
          BASsssana
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
