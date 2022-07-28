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

function ChattingRoomHeader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chattingRoomInfo, isDeleteAllowModal } = useSelector(
        state => state.taxi,
    );
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
        dispatch(deleteModal(chattingRoomInfo));
    }, [chattingRoomInfo]);

    const changeHeadCountClick = useCallback(() => {
        dispatch(changeMaximumModalClick());
    }, [dispatch]);

    return (
        <div className="chattingroomheader-wrapper">
            <div className="back-icon">
                <img
                    src={TalkIcon}
                    alt="talk"
                    onClick={gotoBackPage}
                    aria-hidden
                />
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
                    <p>
                        {chatRoomHeaderInfo &&
                        chatRoomHeaderInfo.place === '서울여자간호대학교'
                            ? '간호대'
                            : chatRoomHeaderInfo.place}
                    </p>
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
