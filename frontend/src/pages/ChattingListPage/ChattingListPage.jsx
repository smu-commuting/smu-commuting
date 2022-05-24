import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyChatRooms } from '../../modules/reducers/chat';
import './ChattingListPage.scss';
import getOut from '../../assets/ChattingListPage/첫줄.png';

function ChattingListPage() {
    const dispatch = useDispatch();
    const { myChatRooms } = useSelector(state => state.chat);
    useEffect(() => {
        dispatch(getMyChatRooms());
    }, []);
    return (
        <ul className="chattinglist-wrapper">
            {myChatRooms.map(myChatRoom => {
                return (
                    <li key={myChatRoom.chatRoomId}>
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
