/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import './TaxiCard.scss';

function TaxiCard({ taxiPartyId, headcount, maximum, time }) {
    return (
        <div className="taxicard-wrapper">
            <p>{time}</p>
            <p>
                {headcount} / {maximum}
            </p>
        </div>
    );
}

export default TaxiCard;
