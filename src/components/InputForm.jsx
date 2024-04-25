
import * as React from 'react';
import '../App.css';
import Result from './Result'
export default function InputForm({ index, handleSubmit, currentRound, difficultyLevel }) {


    const [correctNumber, setCorrectNumber] = React.useState(0);
    const [correctLocation, setCorrectLocation] = React.useState(0);
    //if current round is not equal to index, disable the input
    const isDisabled = currentRound !== index;
    const showResult = currentRound > index


    function handleGuess(e) {
        e.preventDefault();
        const { correctLocation, correctNumber } = handleSubmit(e);
        setCorrectNumber(correctNumber);
        setCorrectLocation(correctLocation);


    }
    return (
        <div className='form'>
            <form onSubmit={handleGuess}>
                <label>{index + 1}. </label>
                {Array.from({ length: difficultyLevel }, (_, i) => <input key={i} type="number" className="inputField" min={0} max={7} name={i} required disabled={isDisabled} />)
                }
                <button type="submit" disabled={isDisabled} className='submit-btn'>Submit</button>
                <div> {showResult ?
                    <Result correctLocation={correctLocation} correctNumber={correctNumber} />
                    : null}</div>

            </form >
        </div >
    )
}