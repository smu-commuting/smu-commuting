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
import { deleteModal, getMyTaxiParties } from '../../modules/reducers/taxi';
import { getProfileImgList } from '../../modules/reducers/user';

function ChattingListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myTaxiParties, deleteTaxiPartyDone, isDeleteAllowModal } =
        useSelector(state => state.taxi);
    const { profileImgList } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getMyTaxiParties());
        if (profileImgList.length === 0) dispatch(getProfileImgList());
    }, [dispatch, deleteTaxiPartyDone, isDeleteAllowModal]);
    const onChatRoomEnter = useCallback(id => {
        navigate(`/chatroom/${id}`);
    }, []);
    const onDeleteClick = useCallback(myTaxiParty => {
        dispatch(deleteModal(myTaxiParty));
    }, []);
    return (
        <ul className="chattinglist-wrapper">
            {myTaxiParties.length !== 0 ? (
                myTaxiParties.map(myTaxiParty => {
                    return (
                        <li
                            key={myTaxiParty.chatRoomId}
                            onClick={() =>
                                onChatRoomEnter(myTaxiParty.chatRoomId)
                            }
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
                            <div>{myTaxiParty.date}</div>
                            <div>{myTaxiParty.place}</div>
                            <div>{myTaxiParty.time}</div>
                            <div>
                                ({myTaxiParty.headcount}/{myTaxiParty.maximum})
                            </div>
                            <div
                                onClick={prevent(() =>
                                    onDeleteClick(myTaxiParty),
                                )}
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
