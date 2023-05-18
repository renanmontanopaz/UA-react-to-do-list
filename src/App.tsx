import { Content } from "./components/Content"
import { Header } from "./components/Header"
import { ToDoContextProvider } from "./contexts/ToDo"

function App() {

  return (
    <>
      <Header />
      <ToDoContextProvider>
        <Content />
      </ToDoContextProvider>
    </>

  )
}

export default App
