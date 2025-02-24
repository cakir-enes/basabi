import { ExerciseData, selectedExerciseAtom } from "@/components/newset"
import { ScrollBar } from "@/components/ui/scroll-area"
import { useAuth, useUser, useWorkoutDetailsQuery, useWorkoutsQuery } from "@/hooks/usePB"
import { useSheetManager } from "@/hooks/useSheetManager"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useSetAtom } from "jotai"
import { DotIcon } from "lucide-react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"


export function Home() {
  const auth = useAuth()
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.count("login")
    auth.login.mutate({ email: "myuser@gmail.com", password: "4AMZTphrda8yYKp" })
  }, [])


  const workoutsQuery = useWorkoutsQuery()


  return <div className="w-full  flex flex-col overflow-auto">
    {workoutsQuery.data?.map((wm) => (
      <div className="flex gap-2" key={wm.id} onClick={() => navigate(`workout/${wm.workout_date}`)}>
        <div className="mr-auto">{wm.title}</div>
        <div className="">{wm.vol}kg</div>
        <div className="">{wm.workout_date}</div>
      </div>
    ))}
  </div>
}

export function WorkoutDetails() {
  const { date } = useParams()

  const detailsQuery = useWorkoutDetailsQuery(date)
  const setExData = useSetAtom(selectedExerciseAtom)
  const sheets = useSheetManager()

  const openNewSet = (p: ExerciseData) => {
    setExData(p)
    sheets.openSheet("set")
  }

  return <div>
    Waorkout Details for {date}
    <div>
      {detailsQuery.isError && <div>Sorry luv</div>}
      <div>
        {detailsQuery.data?.map(e => (
          <div key={e.id}>
            {e.exercise}
            <ScrollArea className="w-52 overflow-auto whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 py-2">
                {e.sets.map(s =>
                  <div className="flex flex-col text-sm items-center" onClick={() => openNewSet({ id: e.exercise_id, name: e.exercise })}>
                    {s.weight}
                    <DotIcon className="-m-2" />
                    {s.reps}
                  </div>)}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  </div>
}

