import React from "react"
import { QuizContext } from "../Helpers/Contexts"
import { useContext } from "react"

function EndScreen() {
  const { score, setScore, setGameState } = useContext(QuizContext)
  return (
    <div>
      <div>Score: {score}</div>
      <button
        onClick={() => {
          setScore(0)
          setGameState("menu")
        }}
      >
        Main Menu
      </button>
    </div>
  )
}

export default EndScreen
