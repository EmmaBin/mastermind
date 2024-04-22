import './App.css';
import * as React from 'react';
import getCodes from './utils/getCodes';
function App() {
  const [secretCodes, setSecretCodes] = React.useState([])

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const codes = await getCodes(4)
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
      {secretCodes}






    </div>
  );
}

export default App;
