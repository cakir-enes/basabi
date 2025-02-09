import { useExercisesQuery } from "@/hooks/usePB"
import { ExercisesRecord } from "@/lib/pocketbase-types"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useMutation } from "@tanstack/react-query"
import { ChevronRightIcon } from "lucide-react"
import { useParams } from "react-router"
import { Input } from "./ui/input"
import { SheetContent, SheetTitle } from "./ui/sheet"
import { useSheetManager } from "@/hooks/useSheetManager"

export function NewExercise() {
  const exercisesQuery = useExercisesQuery()
  const { date } = useParams()
  const sheets = useSheetManager()


  const newExMut = useMutation({
    mutationFn: async (ex: ExercisesRecord) => {
      console.log("adding ex to date", date, " ", ex)
    },
    onMutate: () => {
      sheets.closeSheet("exercise")
    }
  })

  return <SheetContent side="bottom" className="px-4 py-2">
    <SheetTitle className="text-2xl">New Exercise</SheetTitle>
    <Input type="text" placeholder="Search..." />
    <ScrollArea className="h-[70dvh] overflow-auto">
      {exercisesQuery.data?.map(e => (
        <div className="flex items-center w-full py-2 pl-1" onClick={() => newExMut.mutate(e)}>
          <ChevronRightIcon />
          <div>{e.name}</div>
        </div>))}
    </ScrollArea>
  </SheetContent>


}
