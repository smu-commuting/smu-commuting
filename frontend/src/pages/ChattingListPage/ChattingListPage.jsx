import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyChatRooms } from '../../modules/reducers/chat';
import './ChattingListPage.scss';
import getOut from '../../assets/ChattingList/ChattingListPage/첫줄.png';

function ChattingListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myChatRooms } = useSelector(state => state.chat);
    useEffect(() => {
        dispatch(getMyChatRooms());
    }, []);
    const onChatRoomEnter = useCallback(id => {
        navigate(`/chatroom/${id}`);
    }, []);
    return (
        <ul className="chattinglist-wrapper">
            {myChatRooms.map(myChatRoom => {
                return (
                    <li
                        key={myChatRoom.chatRoomId}
                        onClick={() => onChatRoomEnter(myChatRoom.chatRoomId)}
                        aria-hidden
                    >
                        <div>
                            <img src={getOut} alt="스뭉이 임시" />
                        </div>
                        <div>{myChatRoom.date}</div>
                        <div>{myChatRoom.place}</div>
                        <div>{myChatRoom.time}</div>
                        <div>
                            ({myChatRoom.headcount}/{myChatRoom.maximum})
                        </div>
                        <div>
                            <img src={getOut} alt="나가기" />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default ChattingListPage;
