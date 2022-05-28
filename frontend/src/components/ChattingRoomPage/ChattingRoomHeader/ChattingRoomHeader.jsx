import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './ChattingRoomHeader.scss';
import Talk from '../../../assets/ChattingList/ChattingListHeader/talk.png';
import getOut from '../../../assets/ChattingList/ChattingListPage/첫줄.png';

function ChattingRoomHeader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { myTaxiParties } = useSelector(state => state.taxi);
    const [meetInfo, setMeetInfo] = useState();

    useEffect(() => {
        const info = myTaxiParties.find(
            myChatRoom => myChatRoom.chatRoomId === parseInt(id, 10),
        );
        setMeetInfo(`${info.place} ${info.time}`);
    }, [id]);

    const gotoBack = useCallback(() => {
        navigate(-1);
    }, []);
    return (
        <div className="chattingroomheader-wrapper">
            <div>
                <img src={Talk} alt="talk" onClick={gotoBack} aria-hidden />
            </div>
            <div>
                <div>{meetInfo}</div>
            </div>
            <div>
                <img src={getOut} alt="out" />
            </div>
        </div>
    );
}

export default ChattingRoomHeader;
