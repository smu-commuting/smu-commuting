/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { taxiToChatModal } from '../../../modules/reducers/taxi';
import './TaxiCard.scss';

function TaxiCard({ taxiPartyId, headcount, maximum, time }) {
    const { taxiPageInfo, myTaxiParties } = useSelector(state => state.taxi);
    const dispatch = useDispatch();
    const [card, setCard] = useState();
    const navigate = useNavigate();
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
        console.log(taxiPageInfo.placeName);
        const data = {
            placeName: taxiPageInfo.placeName,
            time,
            taxiPartyId,
        };
        // useSelector로 해당 클릭한 id(chatRoomId) 와 비교하여
        // 존재(taxiPartyId)한다면 바로 채팅방으로 이동, 없다면 모달 띄워준다.
        const alreadyEnter = myTaxiParties.find(myTaxiParty => {
            return myTaxiParty.chatRoomId === taxiPartyId;
        });
        alreadyEnter
            ? navigate(`/chatroom/${taxiPartyId}`)
            : dispatch(taxiToChatModal(data));
    };
    return (
        <div className={card} onClick={onCardClick} aria-hidden>
            <p>{taxiPartyId}</p>
            <p>{time}</p>
            <p>
                {headcount} / {maximum}
            </p>
        </div>
    );
}

export default TaxiCard;
