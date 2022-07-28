/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChattingListPage.scss';
import getOut from '../../assets/ChattingList/ChattingListPage/첫줄.png';
import sumung from '../../assets/ChattingList/ChattingListPage/sample_sumung.png';
import nonchat from '../../assets/ChattingList/ChattingListPage/non-chat.png';
import { prevent } from '../../constants';
import {
    deleteModal,
    getMyTaxiParties,
    listToTaxiInfo,
} from '../../modules/reducers/taxi';
import { getProfileImgList } from '../../modules/reducers/user';

function ChattingListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myTaxiParties, deleteTaxiPartyDone, isDeleteAllowModal } =
        useSelector(state => state.taxi);
    const { profileImgList } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getMyTaxiParties());
        dispatch(getProfileImgList());
    }, [dispatch, deleteTaxiPartyDone, isDeleteAllowModal]);
    const onChatRoomEnter = useCallback(id => {
        navigate(`/chatroom/${id}`);
    }, []);
    const onDeleteClick = useCallback(() => {
        dispatch(deleteModal());
    }, []);
    const chattingInfo = useCallback(
        info => {
            const data = {
                taxiPartyId: info.chatRoomId,
                placeName: info.place,
                headcount: info.headcount,
                maximum: info.maximum,
                time: info.time,
            };
            dispatch(listToTaxiInfo(data));
        },
        [dispatch],
    );
    return (
        <ul className="chattinglist-wrapper">
            {myTaxiParties && myTaxiParties.length !== 0 ? (
                myTaxiParties.map(myTaxiParty => {
                    return (
                        <li
                            key={myTaxiParty.chatRoomId}
                            onClick={() => {
                                onChatRoomEnter(myTaxiParty.chatRoomId);
                                chattingInfo(myTaxiParty);
                            }}
                            aria-hidden
                        >
                            <div className="img-wrapper">
                                <img
                                    src={
                                        profileImgList &&
                                        profileImgList[
                                            Math.floor(
                                                Math.random() *
                                                    profileImgList.length,
                                            )
                                        ].url
                                    }
                                    alt="스뭉이 임시"
                                />
                            </div>
                            <div>{myTaxiParty && myTaxiParty.date}</div>
                            <div>
                                {myTaxiParty &&
                                myTaxiParty.place === '서울여자간호대학교'
                                    ? '간호대'
                                    : myTaxiParty.place}
                            </div>
                            <div>{myTaxiParty && myTaxiParty.time}</div>
                            <div>
                                ({myTaxiParty && myTaxiParty.headcount}/
                                {myTaxiParty && myTaxiParty.maximum})
                            </div>
                            <div
                                onClick={prevent(() => {
                                    chattingInfo(myTaxiParty);
                                    onDeleteClick();
                                })}
                                aria-hidden
                            >
                                <img src={getOut} alt="나가기" />
                            </div>
                        </li>
                    );
                })
            ) : (
                <div className="non-chat-wrapper">
                    <div className="content-wrapper">
                        <img src={nonchat} alt="채팅 없음" />
                        <p>참여 중인 대화방이 없습니다.</p>
                    </div>
                </div>
            )}
        </ul>
    );
}

export default ChattingListPage;
