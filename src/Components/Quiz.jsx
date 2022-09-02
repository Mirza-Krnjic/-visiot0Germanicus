import { useState, useContext, useEffect } from "react"
// import { Questions } from "../Helpers/QuestionBank"
import styles from "./Quiz.module.css"
import { QuizContext } from "../Helpers/Contexts"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import ProgressBar from "./ProgressBar"

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [choosenOption, setChoosenOption] = useState("")
  const {
    score,
    setScore,
    setGameState,
    retrainQuestions,
    setRetrainQuestions,
  } = useContext(QuizContext)
  const questionsCollectionRef = collection(db, "questions")
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState("________")

  const [fbQuestions, setFbQuestions] = useState([])

  useEffect(() => {
    setLoading(true)
    const getTest = async () => {
      const data = await getDocs(questionsCollectionRef)
      setFbQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log(fbQuestions)
      setLoading(false)
    }
    getTest()
  }, [])

  const nextQuestion = () => {
    if (fbQuestions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
    }
    setCurrentQuestion(currentQuestion + 1)
    setAnswer("________")
  }

  const finishQuiz = () => {
    if (fbQuestions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
      setAnswer("________")
    }
    setGameState("endScreen")
  }

  return (
    <div className={styles.Quiz}>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <ProgressBar value={score} max={fbQuestions.length} />
          <p>
            {fbQuestions[currentQuestion].fillerTextA}
            {answer}
            {fbQuestions[currentQuestion].fillerTextB}
          </p>
          <h2>Score: {score}</h2>
          <div className={styles.options}>
            <button
              onClick={(e) => {
                setChoosenOption("A")
                setAnswer(` ${fbQuestions[currentQuestion].optionA} `)
              }}
            >
              {fbQuestions[currentQuestion].optionA}
            </button>
            <button
              onClick={() => {
                setChoosenOption("B")
                setAnswer(` ${fbQuestions[currentQuestion].optionB} `)
              }}
            >
              {fbQuestions[currentQuestion].optionB}
            </button>
            <button
              onClick={() => {
                setChoosenOption("C")
                setAnswer(` ${fbQuestions[currentQuestion].optionC} `)
              }}
            >
              {fbQuestions[currentQuestion].optionC}
            </button>
            <button
              onClick={() => {
                setChoosenOption("D")
                setAnswer(` ${fbQuestions[currentQuestion].optionD} `)
              }}
            >
              {fbQuestions[currentQuestion].optionD}
            </button>
          </div>

          {currentQuestion == fbQuestions.length - 1 ? (
            <button onClick={() => finishQuiz()}>Finish</button>
          ) : (
            <button onClick={() => nextQuestion()}>Continue</button>
          )}
        </>
      )}
    </div>
  )
}

export default Quiz
