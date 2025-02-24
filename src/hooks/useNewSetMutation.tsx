import { SetsRecord, WorkoutDetailsRecord } from '@/lib/pocketbase-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useNavigate, useParams } from 'react-router'
import { pocketbaseAtom, useUser } from './usePB'

export const useNewSetMutation = () => {
  const { date } = useParams()
  const pb = useAtomValue(pocketbaseAtom)
  const queryClient = useQueryClient()
  const user = useUser()
  const wDate = (date ? new Date(date) : new Date()).toISOString().split('T')[0]
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (args: { exercise: string; reps: number; weight: number }) => {
      console.log('this wont work getting called')
      return pb.collection('sets').create<SetsRecord>({
        exercise: args.exercise,
        workout_date: wDate,
        weight: args.weight,
        reps: args.reps,
        user: user.data!.id,
      })
    },
    onMutate: (args) => {
      queryClient.setQueryData(['workoutDetails', wDate], (w: WorkoutDetailsRecord[] = []) => {
        const ww = w.findIndex((x) => x.exercise_id === args.exercise)
        if (ww != -1) {
          w[ww].sets.push({ id: 'temp', reps: args.reps, weight: args.weight })
        } else {
          w.push({
            id: 'temp',
            exercise: 'exeo',
            exercise_id: args.exercise,
            created: new Date().toISOString(),
            duration_sec: 0,
            target: ['chest'],
            vol: 0,
            sets: [
              {
                id: 'temp',
                reps: args.reps,
                weight: args.weight,
              },
            ],
            user: user.data!.id,
            workout_date: wDate,
          })
        }
        return [...w]
      })
    },
    onSuccess: () => {
      setTimeout(() => {
        console.log('invladiting ', wDate)
        queryClient.refetchQueries({
          queryKey: ['workoutDetails', wDate],
        })
        if (!date) {
          queryClient.refetchQueries({ queryKey: ['workouts'] })
          navigate('/workout/' + wDate)
        }
      }, 200)
    },
  })
}
