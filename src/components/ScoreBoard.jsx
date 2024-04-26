export default function ScoreBoard() {
    let easy = localStorage.getItem(4);
    let medium = localStorage.getItem(5);
    let hard = localStorage.getItem(6);
    return (
        <div>
            <p>Best Performance:</p>
            <ul>
                <li>Easy: {easy ? easy : "--"} seconds</li>
                <li>Med: {medium ? medium : "--"} seconds</li>
                <li>Hard: {hard ? hard : "--"} seconds</li>
            </ul>

        </div>
    )
}