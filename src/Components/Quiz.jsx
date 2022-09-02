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
    isRetraining,
    setIsRetraining,
    isStartRetrain,
    setIsStartRetrain,
    isGameOver,
    setIsGameOver,
  } = useContext(QuizContext)
  const questionsCollectionRef = collection(db, "questions")
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState(" ________ ")

  const [fbQuestions, setFbQuestions] = useState([])

  useEffect(() => {
    setLoading(true)
    const getTest = async () => {
      const data = await getDocs(questionsCollectionRef)
      setFbQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // console.log(fbQuestions)
      setLoading(false)
    }
    getTest()
  }, [])

  const nextQuestion = () => {
    console.log(`current question index: ${currentQuestion}`)
    console.log(`isRetraining: ${isRetraining}`)
    console.log(`isStartRetrain: ${isStartRetrain}`)

    // start retrain, extends questions array
    if (currentQuestion == fbQuestions.length - 1 && isRetraining) {
      console.log("OVO RADI")
      setIsStartRetrain(true)
      console.log(`isStartRetrain: ${isStartRetrain}`)
    }

    // check answer
    if (fbQuestions[currentQuestion].answer == choosenOption) {
      setScore(score + 1)
      if (score == fbQuestions.length) {
        setScore(score - 1)
        console.log("game should end")
        setIsGameOver(true)
        setGameState("endScreen")
        setIsStartRetrain(false)
        setIsRetraining(false)
      }
    } else {
      // if wrong answer
      setIsRetraining(true)
      setRetrainQuestions((prev) => [...prev, currentQuestion])
    }

    // adds next question in different order
    if (isStartRetrain) {
      console.log("started retraining")
      setCurrentQuestion(retrainQuestions[0])
      retrainQuestions.shift()
      if (retrainQuestions.length === 0) {
        setIsStartRetrain(false)
        setIsRetraining(false)
        // currentQuestion = fbQuestions.length - 1
      }
    }

    if (currentQuestion < fbQuestions.length - 1)
      setCurrentQuestion(currentQuestion + 1)

    setAnswer(" ________ ")
  }

  return (
    <div className={styles.Quiz}>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <></>
          <ProgressBar value={score} max={fbQuestions.length} />
          <h4>{fbQuestions[currentQuestion].question}</h4>
          <p>
            {fbQuestions[currentQuestion].fillerTextA}
            {answer}
            {fbQuestions[currentQuestion].fillerTextB}
          </p>
          <h2>Score: {score}</h2>
          {score === fbQuestions.length ? (
            <h2>Good Job !</h2>
          ) : (
            <>
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
            </>
          )}
          <button onClick={() => nextQuestion()}>Continue</button>
        </>
      )}
    </div>
  )
}

export default Quiz
