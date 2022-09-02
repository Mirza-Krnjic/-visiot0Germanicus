import React from "react"
import { QuizContext } from "../Helpers/Contexts"
import { useContext } from "react"

function EndScreen() {
  const { score, setScore, setGameState, retrainQuestions, setIsGameOver } =
    useContext(QuizContext)

  console.log(retrainQuestions)
  return (
    <div>
      <div>Score: {score}</div>
      <div>Retrain questions: {retrainQuestions.length}</div>
      <button
        onClick={() => {
          setScore(0)
          setGameState("menu")
          setIsGameOver(false)
        }}
      >
        Main Menu
      </button>
    </div>
  )
}

export default EndScreen
