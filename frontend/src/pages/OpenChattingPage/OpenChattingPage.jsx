/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {
    deleteBusMessageList,
    getBusMessageList,
} from '../../modules/reducers/chat';
import { firstEnterDateParser } from '../../constants/FirstEnterDateParser';
import './OpenChattingPage.scss';
import sendicon from '../../assets/OpenChatting/send-icon.png';
import MeChatBox from '../../components/OpenChatting/MeChatBox/MeChatBox';
import SenderChatBox from '../../components/OpenChatting/SenderChatBox/SenderChatBox';

function OpenChattingPage() {
    // id : 1 -> 7016 , id : 2 -> 서대문 08
    const { id } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const {
        busLoadEnd,
        busMessageListDone,
        busMessageList,
        busMessageListLoading,
    } = useSelector(state => state.chat);
    const [messageBottle, setMessageBottle] = useState([]);
    const [myChat, setMyChat] = useState();

    // 소켓 connect
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
    const ws = Stomp.over(sock);

    const pushMessage = useCallback(message => {
        const received = JSON.parse(message.body);
        console.log('여기 와야함', received);
        setMessageBottle(prev => {
            return [received, ...prev];
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
            dispatch(deleteBusMessageList());
            ws && ws.disconnect();
        };
    }, [dispatch, id]);

    useEffect(() => {
        setMessageBottle(prev => [...prev, ...busMessageList]);
    }, [busMessageList]);

    // 스크롤이 내려갈 때마다 데이터를 불러오는 로직
    useEffect(() => {
        function onScroll() {
            if (
                window.innerHeight + window.scrollY >
                document.body.offsetHeight - 10
            ) {
                if (!busLoadEnd && !busMessageListLoading) {
                    dispatch(
                        getBusMessageList({
                            roomId: id,
                            size: 10,
                            date: busMessageList[busMessageList.length - 1]
                                .createdTime,
                        }),
                    );
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [window.scrollY, busLoadEnd, busMessageListDone]);

    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    const onSubmitHandler = () => {
        if (!myChat) {
            return;
        }
        ws.send(
            '/pub/chat/bus/message',
            {},
            JSON.stringify({
                message: myChat,
                roomId: id,
                senderId: userId,
                studentId,
            }),
        );
        setMyChat('');
    };

    return (
        <div className="openchattingpage-wrapper">
            <div className="input-area">
                <textarea value={myChat} onChange={myChatChange} required />
                <div>
                    <img
                        src={sendicon}
                        alt="전송"
                        onClick={onSubmitHandler}
                        aria-hidden
                    />
                </div>
            </div>
            <div className="openchatting-list">
                {messageBottle ? (
                    messageBottle.map((message, index) => {
                        return message.senderStudentId ===
                            parseInt(studentId, 10) ? (
                            <MeChatBox
                                key={message.messageId}
                                id={message.messageId}
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        ) : (
                            <SenderChatBox
                                key={message.messageId}
                                id={message.messageId}
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        );
                    })
                ) : (
                    <p>로딩중</p>
                )}
            </div>
        </div>
    );
}

export default OpenChattingPage;
