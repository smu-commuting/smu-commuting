/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './ChattingRoomHeader.scss';
import TalkIcon from '../../../assets/ChattingPage/chatting-icon.png';
import ExitIcon from '../../../assets/ChattingPage/exit-icon.png';
import { deleteModal } from '../../../modules/reducers/taxi';
import {
    changeMaximumModalClick,
    getChatRoomHeaderInfo,
} from '../../../modules/reducers/chat';
import Back from '../../../assets/ChattingList/ChattingListHeader/Back.png';

function ChattingRoomHeader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isDeleteAllowModal } = useSelector(state => state.taxi);
    const { chatRoomHeaderInfo, changeMaximumDone } = useSelector(
        state => state.chat,
    );

    useEffect(() => {
        dispatch(getChatRoomHeaderInfo(id));
    }, [dispatch, changeMaximumDone]);

    useEffect(() => {
        if (isDeleteAllowModal) navigate(-1);
    }, [isDeleteAllowModal]);

    const gotoBackPage = useCallback(() => {
        navigate(-1);
    }, []);

    const onDeleteClick = useCallback(() => {
        dispatch(deleteModal(chatRoomHeaderInfo));
    }, [chatRoomHeaderInfo]);

    const changeHeadCountClick = useCallback(() => {
        dispatch(changeMaximumModalClick());
    }, [dispatch]);

    const placeNameSelector = place => {
        if (place === '서울여자간호대학교') return '간호대';
        if (place === 'KT 광화문지사') return '광화문';
        return place;
    };

    return (
        <div className="chattingroomheader-wrapper">
            <div className="back-icon">
                <img src={Back} alt="talk" onClick={gotoBackPage} aria-hidden />
            </div>
            <div
                className="room-info"
                onClick={changeHeadCountClick}
                aria-hidden
            >
                <div className="meet-time">
                    <p>{chatRoomHeaderInfo && chatRoomHeaderInfo.time}</p>
                </div>
                <div className="meet-place">
                    {chatRoomHeaderInfo && (
                        <p>{placeNameSelector(chatRoomHeaderInfo.place)}</p>
                    )}
                </div>
                <div className="meet-people">
                    <p>{`${chatRoomHeaderInfo && chatRoomHeaderInfo.headcount} /
                        ${
                            chatRoomHeaderInfo && chatRoomHeaderInfo.maximum
                        }`}</p>
                </div>
            </div>
            <div className="out-icon">
                <img
                    src={ExitIcon}
                    alt="out"
                    onClick={onDeleteClick}
                    aria-hidden
                />
            </div>
        </div>
    );
}

export default ChattingRoomHeader;
