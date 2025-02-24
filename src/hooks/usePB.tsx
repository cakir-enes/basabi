import PocketBase, { AuthRecord } from 'pocketbase'
import { atomWithStorage } from 'jotai/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { TypedPocketBase } from '@/lib/pocketbase-types'

export const pocketbaseAtom = atom(
  () => new PocketBase(import.meta.env.VITE_PB_URL) as TypedPocketBase,
)

// types/auth.ts
export interface User {
  id: string
  email: string
  name?: string
  // ... other user fields
}

export interface LoginCredentials {
  email: string
  password: string
}

// atoms/auth.ts

// Persist auth token in localStorage
export const authTokenAtom = atomWithStorage('auth-token', '')

// Current user atom
export const userAtom = atom<AuthRecord | null>(null)

export function useAuth() {
  const pb = useAtomValue(pocketbaseAtom)
  const setUser = useSetAtom(userAtom)
  const queryClient = useQueryClient()

  return {
    login: useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const authData = await pb
          .collection('users')
          .authWithPassword(credentials.email, credentials.password)

        return authData.record
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
      },
    }),

    logout: useMutation({
      mutationFn: async () => {
        pb.authStore.clear()
        setUser(null)
        queryClient.clear() // Clear all queries on logout
      },
    }),

    register: useMutation({
      mutationFn: async (data: { email: string; password: string; name?: string }) => {
        const record = await pb.collection('users').create(data)
        return record
      },
    }),
  }
}

// Current user query
export function useUser() {
  const pb = useAtomValue(pocketbaseAtom)
  const setUser = useSetAtom(userAtom)

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!pb.authStore.isValid) {
        return null
      }
      const user = pb.authStore.record
      setUser(user)
      return user
    },
    // Only run if we have a token
    enabled: pb.authStore.isValid,
  })
}

// Optional: Auth guard hook
export function useRequireAuth() {
  const user = useAtomValue(userAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return user
}

export function useWorkoutsQuery() {
  const pb = useAtomValue(pocketbaseAtom)

  return useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      return pb.collection('workout_metas').getFullList({ filter: '' })
    },
    enabled: pb.authStore.isValid,
  })
}

export function useExercisesQuery() {
  const pb = useAtomValue(pocketbaseAtom)

  return useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return pb.collection('exercises').getFullList({ filter: '' })
    },
    enabled: pb.authStore.isValid,
  })
}

export function useWorkoutDetailsQuery(date?: string) {
  const pb = useAtomValue(pocketbaseAtom)

  return useQuery({
    queryKey: ['workoutDetails', date],
    queryFn: async () => {
      return pb
        .collection('workout_details')
        .getFullList({ filter: `workout_date = '${date}'`, sort: 'created' })
    },
    enabled: pb.authStore.isValid && !!date,
  })
}
