/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './ChattingRoomHeader.scss';
import Talk from '../../../assets/ChattingList/ChattingListHeader/talk.png';
import getOut from '../../../assets/ChattingList/ChattingListPage/첫줄.png';
import { deleteModal } from '../../../modules/reducers/taxi';

function ChattingRoomHeader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myTaxiParties, chattingRoomInfo, isDeleteAllowModal } = useSelector(
        state => state.taxi,
    );
    const [myTaxiParty, setMyTaxiParty] = useState();
    const [meetInfo, setMeetInfo] = useState();
    const getInfo = useCallback(() => {
        const info = myTaxiParties.find(
            myChatRoom => myChatRoom.chatRoomId === parseInt(id, 10),
        );
        setMeetInfo(() => `${info && info.place} ${info && info.time}`);
        console.log(info);
        setMyTaxiParty(() => info);
        if (!info) {
            setMeetInfo(
                () =>
                    `${chattingRoomInfo && chattingRoomInfo.placeName} ${
                        chattingRoomInfo && chattingRoomInfo.time
                    }`,
            );
            setMyTaxiParty(() => chattingRoomInfo);
        }
    }, []);

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        if (isDeleteAllowModal) navigate(-1);
    }, [isDeleteAllowModal]);

    const gotoBackPage = useCallback(() => {
        navigate(-1);
    }, []);

    const onDeleteClick = useCallback(() => {
        console.log(myTaxiParty);
        dispatch(deleteModal(myTaxiParty));
    }, [myTaxiParty]);

    return (
        <div className="chattingroomheader-wrapper">
            <div>
                <img src={Talk} alt="talk" onClick={gotoBackPage} aria-hidden />
            </div>
            <div>
                <div>{meetInfo}</div>
            </div>
            <div>
                <img
                    src={getOut}
                    alt="out"
                    onClick={() => onDeleteClick()}
                    aria-hidden
                />
            </div>
        </div>
    );
}

export default ChattingRoomHeader;
