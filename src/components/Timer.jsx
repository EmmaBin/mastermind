import * as React from 'react';
import '../App.css';
import ScoreBoard from './ScoreBoard';
export default function Timer({ restart, stopTimer, difficultyLevel }) {

    const [second, setSecond] = React.useState(0)

    React.useEffect(() => {
        setSecond(0);
        let timer
        if (stopTimer) {
            console.log("stop timer", second, difficultyLevel)

            const currScore = localStorage.getItem(difficultyLevel)
            if (currScore === null || currScore === undefined) {
                localStorage.setItem(difficultyLevel, second)
            }
            if (currScore > second) {
                localStorage.setItem(difficultyLevel, second)
            }

        }
        if (!stopTimer) {
            timer = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
        }

        return () => {
            clearInterval(timer);
        };
    }, [restart, stopTimer])

    const minute = Math.trunc(second / 60)

    return (
        <>
            <div className='timer'>
                {String(minute).padStart(2, '0')} : {second > 60 ? String(second % 60).padStart(2, '0') : String(second).padStart(2, '0')}
            </div>
            <div>
                <ScoreBoard difficultyLevel={difficultyLevel} />
            </div>
        </>

    )
}