import { useState, useContext } from "react"
import { Questions } from "../Helpers/QuestionBank"
import styles from "./Quiz.module.css"
import { QuizContext } from "../Helpers/Contexts"

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [choosenOption, setChoosenOption] = useState("")
  const { score, setScore, setGameState } = useContext(QuizContext)

  const nextQuestion = () => {
    //d
    if (Questions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
    }
    // alert(score)
    setCurrentQuestion(currentQuestion + 1)
  }

  const finishQuiz = () => {
    if (Questions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
    }
    setGameState("endScreen")
  }

  return (
    <div className={styles.Quiz}>
      <h1>{Questions[currentQuestion].prompt}</h1>
      <h2>Score: {score}</h2>
      <div className={styles.options}>
        <button
          onClick={() => {
            setChoosenOption("A")
          }}
        >
          {Questions[currentQuestion].optionA}
        </button>
        <button
          onClick={() => {
            setChoosenOption("B")
          }}
        >
          {Questions[currentQuestion].optionB}
        </button>
        <button
          onClick={() => {
            setChoosenOption("C")
          }}
        >
          {Questions[currentQuestion].optionC}
        </button>
        <button
          onClick={() => {
            setChoosenOption("D")
          }}
        >
          {Questions[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion == Questions.length - 1 ? (
        <button onClick={() => finishQuiz()}>Finish Quiz</button>
      ) : (
        <button onClick={() => nextQuestion()}>Next Question</button>
      )}
    </div>
  )
}

export default Quiz
