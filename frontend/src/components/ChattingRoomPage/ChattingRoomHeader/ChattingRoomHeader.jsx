/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './ChattingRoomHeader.scss';
import Talk from '../../../assets/ChattingList/ChattingListHeader/talk.png';
import getOut from '../../../assets/ChattingList/ChattingListPage/첫줄.png';
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
            <div>
                <img src={Talk} alt="talk" onClick={gotoBackPage} aria-hidden />
            </div>
            <div className="info">
                <div>{`${chatRoomHeaderInfo && chatRoomHeaderInfo.place} ${
                    chatRoomHeaderInfo && chatRoomHeaderInfo.time
                }`}</div>
                <div
                    className="people"
                    onClick={changeHeadCountClick}
                    aria-hidden
                >
                    {`${chatRoomHeaderInfo && chatRoomHeaderInfo.headcount} /
                        ${chatRoomHeaderInfo && chatRoomHeaderInfo.maximum}`}
                </div>
            </div>
            <div>
                <img
                    src={getOut}
                    alt="out"
                    onClick={onDeleteClick}
                    aria-hidden
                />
            </div>
        </div>
    );
}

export default ChattingRoomHeader;
