/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
  Authorigins = "_authOrigins",
  Externalauths = "_externalAuths",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Exercises = "exercises",
  Prs = "prs",
  Sets = "sets",
  Users = "users",
  WorkoutDetails = "workout_details",
  WorkoutMetas = "workout_metas",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string
  created?: IsoDateString
  fingerprint: string
  id: string
  recordRef: string
  updated?: IsoDateString
}

export type ExternalauthsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  provider: string
  providerId: string
  recordRef: string
  updated?: IsoDateString
}

export type MfasRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  method: string
  recordRef: string
  updated?: IsoDateString
}

export type OtpsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  password: string
  recordRef: string
  sentTo?: string
  updated?: IsoDateString
}

export type SuperusersRecord = {
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}

export enum ExercisesTargetOptions {
  "chest" = "chest",
  "back" = "back",
  "arm" = "arm",
  "biceps" = "biceps",
  "triceps" = "triceps",
  "delts" = "delts",
  "legs" = "legs",
}
export type ExercisesRecord = {
  created: IsoDateString
  id: string
  name: string
  target: ExercisesTargetOptions[]
  updated: IsoDateString
}

export type PrsRecord = {
  exercise: RecordIdString
  id: string
  reps: number
  user: string
  weight: number
  workout_date: IsoDateString
}

export type SetsRecord = {
  created: IsoDateString
  exercise?: RecordIdString
  id: string
  reps: number
  updated: IsoDateString
  user: RecordIdString
  weight: number
}

export type UsersRecord = {
  avatar?: string
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  name?: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}

export enum WorkoutDetailsTargetOptions {
  "chest" = "chest",
  "back" = "back",
  "arm" = "arm",
  "biceps" = "biceps",
  "triceps" = "triceps",
  "delts" = "delts",
  "legs" = "legs",
}
export type WorkoutDetailsRecord = {
  created: IsoDateString
  duration_sec: number
  exercise: RecordIdString
  id: string
  sets: { id: string; weight: number; reps: number }[]
  target: WorkoutDetailsTargetOptions[]
  user: RecordIdString
  vol: number
  workout_date: IsoDateString
}

export type WorkoutMetasRecord = {
  duration_sec: number
  id: string
  title: string
  user: RecordIdString
  vol: number
  workout_date: IsoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ExercisesResponse<Texpand = unknown> = Required<ExercisesRecord> & BaseSystemFields<Texpand>
export type PrsResponse<Texpand = unknown> = Required<PrsRecord> & BaseSystemFields<Texpand>
export type SetsResponse<Texpand = unknown> = Required<SetsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WorkoutDetailsResponse<Texpand = unknown> = Required<WorkoutDetailsRecord> & BaseSystemFields<Texpand>
export type WorkoutMetasResponse<Texpand = unknown> = Required<WorkoutMetasRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord
  _externalAuths: ExternalauthsRecord
  _mfas: MfasRecord
  _otps: OtpsRecord
  _superusers: SuperusersRecord
  exercises: ExercisesRecord
  prs: PrsRecord
  sets: SetsRecord
  users: UsersRecord
  workout_details: WorkoutDetailsRecord
  workout_metas: WorkoutMetasRecord
}

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse
  _externalAuths: ExternalauthsResponse
  _mfas: MfasResponse
  _otps: OtpsResponse
  _superusers: SuperusersResponse
  exercises: ExercisesResponse
  prs: PrsResponse
  sets: SetsResponse
  users: UsersResponse
  workout_details: WorkoutDetailsResponse
  workout_metas: WorkoutMetasResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
  collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
  collection(idOrName: '_mfas'): RecordService<MfasResponse>
  collection(idOrName: '_otps'): RecordService<OtpsResponse>
  collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
  collection(idOrName: 'exercises'): RecordService<ExercisesResponse>
  collection(idOrName: 'prs'): RecordService<PrsResponse>
  collection(idOrName: 'sets'): RecordService<SetsResponse>
  collection(idOrName: 'users'): RecordService<UsersResponse>
  collection(idOrName: 'workout_details'): RecordService<WorkoutDetailsResponse>
  collection(idOrName: 'workout_metas'): RecordService<WorkoutMetasResponse>
}
