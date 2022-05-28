/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChattingListPage.scss';
import getOut from '../../assets/ChattingList/ChattingListPage/첫줄.png';
import sumung from '../../assets/ChattingList/ChattingListPage/sample_sumung.png';
import { prevent } from '../../constants';
import { deleteTaxiParty, getMyTaxiParties } from '../../modules/reducers/taxi';

function ChattingListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myTaxiParties } = useSelector(state => state.taxi);
    useEffect(() => {
        dispatch(getMyTaxiParties());
    }, []);
    const onChatRoomEnter = useCallback(id => {
        navigate(`/chatroom/${id}`);
    }, []);
    const onDeleteClick = useCallback(id => {
        dispatch(deleteTaxiParty(id));
    }, []);
    return (
        <ul className="chattinglist-wrapper">
            {myTaxiParties ? (
                myTaxiParties.map(myTaxiParty => {
                    return (
                        <li
                            key={myTaxiParty.chatRoomId}
                            onClick={() =>
                                onChatRoomEnter(myTaxiParty.chatRoomId)
                            }
                            aria-hidden
                        >
                            <div>
                                <img src={sumung} alt="스뭉이 임시" />
                            </div>
                            <div>{myTaxiParty.date}</div>
                            <div>{myTaxiParty.place}</div>
                            <div>{myTaxiParty.time}</div>
                            <div>
                                ({myTaxiParty.headcount}/{myTaxiParty.maximum})
                            </div>
                            <div
                                onClick={prevent(() =>
                                    onDeleteClick(myTaxiParty.chatRoomId),
                                )}
                                aria-hidden
                            >
                                <img src={getOut} alt="나가기" />
                            </div>
                        </li>
                    );
                })
            ) : (
                <div> 대화 없음 </div>
            )}
        </ul>
    );
}

export default ChattingListPage;
