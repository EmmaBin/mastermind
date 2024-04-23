import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
import InputForm from './components/InputForm';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])
  const [currentRound, setCurrentRound] = React.useState(0)
  const [difficultyLevel, setLevel] = React.useState(4)
  const [formDetail, setFormDetail] = React.useState([])
  // when submit -> 1. create a new form object in the format of { index: 0, value: [1, 2, 3] }
  // 2. push to formDetail Array
  // 3. check against secretCodes -> a new function needed here
  // 4. display feedback
  // 5. check game condition to determine if the game is still going
  function handleSubmit(e) {
    e.preventDefault()

    const newForm = new FormData(e.target)
    console.log(...newForm.values())


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
