import * as React from 'react';
import '../App.css';
export default function Timer({ restart }) {

    const [second, setSecond] = React.useState(0)

    React.useEffect(() => {
        setSecond(0);
        const timer = setInterval(() => {
            setSecond(prev => prev + 1)
        }, 1000)
        return () => {
            clearInterval(timer);
        };
    }, [restart])

    const minute = Math.trunc(second / 60)

    return (

        <div className='timer'>
            {String(minute).padStart(2, '0')}:{second > 60 ? String(second % 60).padStart(2, '0') : String(second).padStart(2, '0')}
        </div>

    )
}