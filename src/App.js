import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
import InputForm from './components/InputForm';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])
  const [currentRound, setCurrentRound] = React.useState(0)
  const [difficultyLevel, setLevel] = React.useState(4)
  const [formDetail, setFormDetail] = React.useState([])
  function handleSubmit() {

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
      <InputForm difficultyLevel={difficultyLevel} currentRound={currentRound} handleSubmit={handleSubmit} />






    </div>
  );
}

export default App;
