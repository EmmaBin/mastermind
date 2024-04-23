import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
import InputForm from './components/InputForm';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])
  const [currentRound, setCurrentRound] = React.useState(0)
  const [difficultyLevel, setLevel] = React.useState(4)
  const [formDetail, setFormDetail] = React.useState([])
  // when submit -> 1. create a new arr like [1,3,4,5]
  // 2. push to formDetail Array
  // 3. check against secretCodes -> a new function needed here
  // 4. display feedback
  // 5. check game condition to determine if the game is still going
  function handleSubmit(e) {
    e.preventDefault()

    const newForm = new FormData(e.target)
    // using ... turn the iterators into arr
    const currentGuess = [...newForm.values()]
    setFormDetail((prev) => [...prev, [currentGuess]])


    //if previous round is not being answered/checked, user should not go to next round
    setCurrentRound((prev) => prev + 1)
    const { correctNumber, correctLocation } = checkAgainstCodes(currentGuess, secretCodes)
    console.log("correct number is", correctNumber, "correct Location", correctLocation)


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
        const codes = await getCodes(difficultyLevel)
        setSecretCodes(codes)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>Mastermind Game ⏳</h1>
      <h2>{secretCodes}</h2>
      {Array.from({ length: 10 }, (_, index) => <InputForm key={index} difficultyLevel={difficultyLevel} currentRound={currentRound} handleSubmit={handleSubmit} index={index} />)}

    </div>
  );
}

export default App;
