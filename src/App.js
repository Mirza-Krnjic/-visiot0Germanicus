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
  const [isRetraining, setIsRetraining] = useState(false)
  const [isStartRetrain, setIsStartRetrain] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  return (
    <div className="App">
      <div className="title">Germanicus</div>
      {/* <h1>Germanicus</h1> */}

      <QuizContext.Provider
        value={{
          gameState,
          setGameState,
          score,
          setScore,
          retrainQuestions,
          setRetrainQuestions,
          isRetraining,
          setIsRetraining,
          isStartRetrain,
          setIsStartRetrain,
          isGameOver,
          setIsGameOver,
        }}
      >
        {gameState === "menu" && <MainMenu />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "endScreen" && <EndScreen />}
      </QuizContext.Provider>
    </div>
  )
}

export default App
