export default function InputForm({ handleSubmit, currentRound, difficultyLevel }) {
    //if current round is not equal to index, disable the input
    // const isDisabled = 
    return (
        <form onSubmit={handleSubmit}>
            <label>Type Your Guess Here:</label>
            {Array.from({ length: difficultyLevel }, (_, i) => <input type="number" min={0} max={7} id={i} required />)

            }



            <button type="submit">Submit</button>
        </form>
    )
}