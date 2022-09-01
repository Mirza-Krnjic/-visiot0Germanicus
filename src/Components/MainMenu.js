import { useContext } from "react"
import { QuizContext } from "../Helpers/Contexts"
import styles from "./MainMenu.module.css"

const MainMenu = () => {
  const { gameState, setGameState } = useContext(QuizContext)

  return (
    <div className={styles.Menu}>
      <button
        onClick={() => {
          setGameState("quiz")
        }}
        className={styles.btn}
      >
        Start Game
      </button>
    </div>
  )
}

export default MainMenu
