import { useAuth, useUser, useWorkoutsQuery } from "@/hooks/usePB"
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

  return <div>
    Waorkout Details for {date}
  </div>
}

