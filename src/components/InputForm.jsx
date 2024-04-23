export default function InputForm({ index, handleSubmit, currentRound, difficultyLevel }) {
    //if current round is not equal to index, disable the input
    // const isDisabled = 
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <label>{index + 1}. Type Your Guess Here: </label>
                {Array.from({ length: difficultyLevel }, (_, i) => <input key={i} type="number" min={0} max={7} name={i} required />)
                }
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}