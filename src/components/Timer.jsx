import * as React from 'react';
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
        <div>

            {minute}:{second}
        </div>
    )
}