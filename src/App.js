import "./App.css"
import { useState, useContext } from "react"
import MainMenu from "./Components/MainMenu"
import Quiz from "./Components/Quiz"
import EndScreen from "./Components/EndScreen"
import { QuizContext } from "./Helpers/Contexts"

function App() {
  const [gameState, setGameState] = useState("menu")
  const [score, setScore] = useState(0)
  const [retrainQuestions, setRetrainQuestions] = useState([])

  return (
    <div className="App">
      <h1>Germanicus</h1>

      <QuizContext.Provider
        value={{ gameState, setGameState, score, setScore }}
      >
        {gameState === "menu" && <MainMenu />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "endScreen" && <EndScreen />}
      </QuizContext.Provider>
    </div>
  )
}

export default App
