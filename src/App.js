import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
import InputForm from './components/InputForm';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])
  const [currentRound, setCurrentRound] = React.useState(0)
  const [difficultyLevel, setLevel] = React.useState(4)
  const [stillGoing, setStillGoing] = React.useState(true)
  const [loading, setLoading] = React.useState(true)

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
      // setFormDetail((prev) => [...prev, [currentGuess]])
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
  function checkAgainstCodes(currentGuess, secretCodes) {
    let correctNumber = 0
    let correctLocation = 0
    let tempDict = {}

    for (const number of secretCodes) {
      tempDict[number] = 0
    }
    for (const number of secretCodes) {
      tempDict[number]++
    }

    for (let i = 0; i < currentGuess.length; i++) {
      const currentNumber = currentGuess[i]
      if (currentNumber in tempDict && tempDict[currentNumber] > 0) {
        correctNumber++;
        tempDict[currentNumber]--
      }

      if (currentNumber === secretCodes[i]) {
        correctLocation++
      }
    }

    // for (let i = 0; i < difficultyLevel; i++) {
    //   if (currentGuess[i] === secretCodes[i]) {
    //     correctLocation++
    //   }
    // }

    return { correctNumber, correctLocation }
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
      <h1 className='nav'>Mastermind Game ⏳</h1>
      <div className="btns">
        <button className="restart-btn" onClick={handleRestart}>Restart Game</button>
        <div className='level-btns'>
          <button onClick={() => handleSetLevel(4)}>Normal</button>
          <button onClick={() => handleSetLevel(6)}>Hard</button>
        </div>
      </div>

      <div>{!stillGoing && <>You won! Our secret code is {secretCodes}</>}</div>
      <div>{formDetail.length === 10 && stillGoing && <>You lost! Our secret code is {secretCodes}</>}</div>
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
