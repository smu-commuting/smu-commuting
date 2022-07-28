/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getBusMessageList } from '../../modules/reducers/chat';
import { firstEnterDateParser } from '../../constants/FirstEnterDateParser';
import './OpenChattingPage.scss';

function OpenChattingPage() {
    // id : 1 -> 7016 , id : 2 -> 서대문 08
    const { id } = useParams();
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const [messageBottle, setMessageBottle] = useState([]);
    const [myChat, setMyChat] = useState();

    // 소켓 connect
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
    const ws = Stomp.over(sock);

    const pushMessage = useCallback(message => {
        const received = JSON.parse(message.body);
        setMessageBottle(prev => {
            return [...prev, received];
        });
    }, []);

    // 처음 들어올 때
    useEffect(() => {
        ws.connect(
            {},
            () => {
                ws.subscribe(`/sub/chat/bus/room/${id}`, pushMessage, {});
            },
            {},
        );
        dispatch(
            getBusMessageList({
                roomId: id,
                size: 10,
                date: firstEnterDateParser(),
            }),
        );
        return () => {
            ws && ws.disconnect();
        };
    }, [dispatch, id]);

    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    const onSubmitHandler = () => {
        if (!myChat) {
            return;
        }
        ws.send(
            '/chat/bus/message',
            {},
            JSON.stringify({
                message: myChat,
                roomId: parseInt(id, 10),
                senderId: parseInt(userId, 10),
                studentId: parseInt(studentId, 10),
            }),
        );
        console.log(myChat);
        setMyChat('');
    };

    return (
        <div className="openchattingpage-wrapper">
            <div className="input-area">
                <textarea value={myChat} onChange={myChatChange} required />
                <button type="submit" onClick={onSubmitHandler}>
                    전송
                </button>
            </div>
            <div className="openchatting-list">리스트 영역</div>
        </div>
    );
}

export default OpenChattingPage;
