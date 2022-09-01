import { useState, useContext, useEffect } from "react"
import { Questions } from "../Helpers/QuestionBank"
import styles from "./Quiz.module.css"
import { QuizContext } from "../Helpers/Contexts"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [choosenOption, setChoosenOption] = useState("")
  const { score, setScore, setGameState } = useContext(QuizContext)
  const questionsCollectionRef = collection(db, "questions")

  const [fbQuestions, setFbQuestions] = useState([])

  useEffect(() => {
    const getTest = async () => {
      //get test
      const data = await getDocs(questionsCollectionRef)
      setFbQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getTest()
  }, [])

  const nextQuestion = () => {
    if (Questions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
    }
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
      {/* {fbQuestions.map((q) => {
        return <div key={q.id}>{q.question}</div>
      })} */}
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
