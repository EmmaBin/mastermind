import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
import InputForm from './components/InputForm';
import Timer from './components/Timer';
import GameRule from './components/GameRule';
import checkAgainstCodes from './utils/checkAgainstCodes';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])
  const [currentRound, setCurrentRound] = React.useState(0)
  const [difficultyLevel, setLevel] = React.useState(4)
  const [stillGoing, setStillGoing] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [gameRule, setGameRule] = React.useState(false)

  //todo: a restart btn to trigger new game --> new api call, empty form
  //adjust difficulty levels, more input field
  //basic UI, bold on hints
  //track least time used on different levels,
  //how to play instructions
  //music
  //number(s) location(s)
  //testing
  const reducer = (formDetail, action) => {
    if (action.type === "reset") {
      return [];
    }
    if (action.type === "append") {
      return [...formDetail, [action.currentGuess]]
    }
  };
  const [restart, setRestart] = React.useState(false)
  const [formDetail, dispatch] = React.useReducer(reducer, []);



  // when submit -> 1. create a new arr like [1,3,4,5]
  // 2. push to formDetail Array
  // 3. check against secretCodes -> a new function needed here
  // 4. display feedback
  // 5. check game condition to determine if the game is still going

  function handleRestart() {
    setRestart((prev) => !prev)
    setCurrentRound(0)
    dispatch({ type: "reset" });
    document.querySelectorAll(".inputField").forEach((input) => input.value = null)
    setStillGoing(true)

  }

  function handleSubmit(e) {
    e.preventDefault()

    const newForm = new FormData(e.target)
    // using ... turn the iterators into arr
    const currentGuess = [...newForm.values()]
    //if previous round is not being answered/checked, user should not go to next round
    if (currentGuess.length === difficultyLevel) {
      dispatch({ type: "append", currentGuess: currentGuess })
      setCurrentRound((prev) => prev + 1)
      const { correctNumber, correctLocation } = checkAgainstCodes(currentGuess, secretCodes)
      console.log("correct number is", correctNumber, "correct Location", correctLocation)
      checkWinningCondition(correctLocation)
      return ({ correctLocation, correctNumber })
    }
  }

  function checkWinningCondition(correctLocation) {
    if (correctLocation === difficultyLevel) {
      setStillGoing(false)
      setCurrentRound(-1)
    }
  }


  function handleSetLevel(level) {
    setLevel(prev => level)
    handleRestart()
  }


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const codes = await getCodes(difficultyLevel)
        setSecretCodes(codes)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()

  }, [restart, difficultyLevel])

  return (
    <div className="App">

      <div className='nav'>
        <button className='rule-btn' onClick={() => setGameRule((prev) => !prev)}>{gameRule ? "HIDE RULE" : "GAME RULE"}</button>
        <h1>Mastermind Game ⏳</h1>
        <Timer restart={restart} />
      </div>


      <div className="btns">
        <button className="restart-btn" onClick={handleRestart}>Restart Game</button>
        <div className='level-btns'>
          <button onClick={() => handleSetLevel(4)}>Normal</button>
          <button onClick={() => handleSetLevel(6)}>Hard</button>
        </div>
      </div>

      <div>{!stillGoing && <><b>You won!</b> Our secret code is {secretCodes}.</>}</div>
      <div>{formDetail.length === 10 && stillGoing && <>You lost! Our secret code is <b>{secretCodes}</b>.</>}</div>
      <div>{gameRule && <GameRule />}</div>
      <h2>{secretCodes}</h2>



      {loading ? <h2 className='loading'>Loading...</h2> :

        Array.from({ length: 10 }, (_, index) => <InputForm
          key={index}
          loading={loading}
          difficultyLevel={difficultyLevel}
          currentRound={currentRound}
          handleSubmit={handleSubmit}
          index={index}
          stillGoing={stillGoing} />)

      }

    </div>
  );
}

export default App;
