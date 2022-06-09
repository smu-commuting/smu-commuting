/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './TaxiCard.scss';

function TaxiCard({ taxiPartyId, headcount, maximum, time }) {
    const [card, setCard] = useState();
    useEffect(() => {
        if (maximum - headcount === 0) {
            setCard('taxicard-end-wrapper');
        } else if (maximum - headcount === 1) {
            setCard('taxicard-soon-end-wrapper');
        } else {
            setCard('taxicard-not-end-wrapper');
        }
    }, []);
    return (
        <div className={card}>
            {/* <p>{taxiPartyId}</p> */}
            <p>{time}</p>
            <p>
                {headcount} / {maximum}
            </p>
        </div>
    );
}

export default TaxiCard;
