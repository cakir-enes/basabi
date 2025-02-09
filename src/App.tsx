import './App.css'
import { Button } from './components/ui/button'
import { Moon, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router";
import { Home, WorkoutDetails } from './pages/home'
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { NewExercise } from './components/newexercise'
import { useSheetManager } from './hooks/useSheetManager'
import { Separator } from './components/ui/separator'


function AppLayout() {
  const sheets = useSheetManager()
  const navigate = useNavigate()

  return <div className="h-dvh w-full px-4  grid grid-rows-[50px_1fr_50px]">
    {/* Fixed Header */}
    <header className="flex-none flex items-center">
      <span className="text-3xl">Basabiiiii</span>
    </header>

    {/* Scrollable Content Area */}
    <div className="w-full  flex flex-col overflow-auto">
      <Outlet />
    </div>
    {/* Optional Fixed Footer */}
    <footer className="flex-none bg-foreground rounded-t-md p-4 text-background flex gap-2 items-center justify-end">
      <span onClick={() => navigate("/")}>Home</span>
      <Separator orientation='vertical' />
      <Sheet open={sheets.sheets.exercise} onOpenChange={() => sheets.toggleSheet("exercise")}>
        <SheetTrigger>New Exercise</SheetTrigger>
        <NewExercise />
      </Sheet>
    </footer>
  </div>

}

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
      }
    }
  });

  return (
    <Provider>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/workout/:date" element={<WorkoutDetails />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}


export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default App
