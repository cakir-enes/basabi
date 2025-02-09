import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth, useExercisesQuery, useUser, useWorkoutsQuery } from "@/hooks/usePB"
import { useEffect } from "react"


export function Home() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )
  const auth = useAuth()
  const user = useUser()

  useEffect(() => {
    console.count("login")
    auth.login.mutate({ email: "myuser@gmail.com", password: "4AMZTphrda8yYKp" })
  }, [])


  const workoutsQuery = useWorkoutsQuery()


  return <div className="h-screen w-full px-4  grid grid-rows-[50px_1fr_50px]">
    {/* Fixed Header */}
    <header className="flex-none flex items-center">
      <span className="text-3xl">Basabiiiii</span>
    </header>

    {/* Scrollable Content Area */}
    <div className="w-full  flex flex-col overflow-auto">
      {workoutsQuery.data?.map((wm) => (
        <div className="flex gap-2" key={wm.id}>
          <div className="mr-auto">{wm.title}</div>
          <div className="">{wm.vol}kg</div>
          <div className="">{wm.workout_date}</div>
        </div>
      ))}
    </div>
    {/* Optional Fixed Footer */}
    <footer className="flex-none bg-blue-300 p-4">
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <NewExercise />
      </Sheet>
    </footer>
  </div>
}


function NewExercise() {
  const exercisesQuery = useExercisesQuery()

  return <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>New Exercise</SheetTitle>
    </SheetHeader>
    {exercisesQuery.data?.map(e => e.name)}

  </SheetContent>


}
