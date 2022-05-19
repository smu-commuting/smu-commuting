/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function Timer({ mm, ss }) {
    const [minutes, setMinutes] = useState(parseInt(mm, 10));
    const [seconds, setSeconds] = useState(parseInt(ss, 10));

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            alert('유효시간 만료');
            window.location.reload();
        }
        const countdown = setInterval(() => {
            if (parseInt(seconds, 10) > 0) {
                setSeconds(parseInt(seconds, 10) - 1);
            }
            if (parseInt(seconds, 10) === 0) {
                if (parseInt(minutes, 10) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(minutes, 10) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(countdown);
        };
    }, [minutes, seconds]);

    return (
        <p>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
    );
}

export default Timer;
