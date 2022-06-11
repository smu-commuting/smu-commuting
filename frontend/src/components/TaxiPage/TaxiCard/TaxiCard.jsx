/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taxiToChatModal } from '../../../modules/reducers/taxi';
import './TaxiCard.scss';

function TaxiCard({ taxiPartyId, headcount, maximum, time }) {
    const { taxiPageInfo } = useSelector(state => state.taxi);
    const dispatch = useDispatch();
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

    const onCardClick = () => {
        const data = {
            placeName: taxiPageInfo.placeName,
            time,
            taxiPartyId,
        };
        dispatch(taxiToChatModal(data));
    };
    return (
        <div className={card} onClick={onCardClick} aria-hidden>
            <p>{time}</p>
            <p>
                {headcount} / {maximum}
            </p>
        </div>
    );
}

export default TaxiCard;
