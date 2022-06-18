/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react';
import './ChattingPage.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChattingRoomHeader from '../../components/ChattingRoomPage/ChattingRoomHeader/ChattingRoomHeader';
import Refusal from '../../assets/ChattingList/ChatInputArea/합승거부.png';
import { getChatMessageList } from '../../modules/reducers/chat';
import { firstEnterDateParser } from '../../constants/FirstEnterDateParser';
import MeChatBox from '../../components/ChattingRoomPage/MeChatBox/MeChatBox';
import SenderChatBox from '../../components/ChattingRoomPage/SenderChatBox/SenderChatBox';

function ChattingPage() {
    // 소켓 connect
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
    const ws = Stomp.over(sock);

    const { id } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const { chatMessageList } = useSelector(state => state.chat);
    const { chatMessageListLoading, chatLoadEnd, chatMessageListDone } =
        useSelector(state => state.chat);

    const [prevHeight, setPrevHeight] = useState();
    const [messageBottle, setMessageBottle] = useState([]);
    const [myChat, setMyChat] = useState();
    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    const pushMessage = useCallback(message => {
        const received = JSON.parse(message.body);
        setMessageBottle(prev => {
            return [...prev, received];
        });
        window.scrollTo(0, document.body.offsetHeight + 100);
    }, []);

    // 처음 들어올 때
    useEffect(() => {
        ws.connect(
            {},
            () => {
                ws.subscribe(`/sub/chat/room/${id}`, pushMessage, {});
            },
            {},
        );
        setTimeout(() => {
            setPrevHeight(document.body.offsetHeight);
            dispatch(
                getChatMessageList({
                    roomId: id,
                    size: 10,
                    date: firstEnterDateParser(),
                }),
            );
            window.scrollTo(0, document.body.offsetHeight);
        }, 100);
        // 나갈때 웹 소켓 연결 끊어줌
        return () => ws && ws.disconnect();
    }, []);

    // 데이터 fetch 되면 메세지 배열 10개 앞에 추가하기
    useEffect(() => {
        const reverse = [...chatMessageList].reverse();
        setMessageBottle([...reverse, ...messageBottle]);
        window.scrollTo(0, document.body.offsetHeight - prevHeight);
        setPrevHeight(document.body.offsetHeight);
    }, [chatMessageList]);

    // 스크롤 천장에 닿으면 데이터 dispatch
    useEffect(() => {
        function onScroll() {
            if (window.scrollY <= 3) {
                if (!chatLoadEnd && !chatMessageListLoading) {
                    // 요청 간 이후 한번만 dispatch
                    dispatch(
                        getChatMessageList({
                            roomId: id,
                            size: 10,
                            date: chatMessageList[chatMessageList.length - 1]
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
    }, [window.scrollY, chatLoadEnd, chatMessageListDone]);

    const onSendMyChatHandler = () => {
        if (!myChat) {
            return;
        }
        ws.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
                messageType: 'TALK',
                message: myChat,
                roomId: id,
                senderId: userId,
                studentId,
            }),
        );
        setMyChat('');
        window.scrollTo(0, document.body.offsetHeight);
    };

    return (
        <div className="chattingpage-wrapper">
            <ChattingRoomHeader />
            <div className="chattingroompage-wrapper">
                <p className="notice">
                    탑승 시각 기준 전후 1시간동안에는 <br /> 하나의 채팅방만
                    입장할 수 있습니다.
                </p>
                {messageBottle &&
                    messageBottle.map((message, index) => {
                        return message.senderStudentId ===
                            parseInt(studentId, 10) ? (
                            <MeChatBox
                                key={index}
                                id={message.messageId}
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        ) : (
                            <SenderChatBox
                                key={index}
                                id={message.messageId}
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        );
                    })}
            </div>
            <div className="chatinputarea-wrapper">
                <div>
                    <img src={Refusal} alt="합승거부" />
                </div>
                <textarea value={myChat} onChange={myChatChange} required />
                <button type="submit" onClick={onSendMyChatHandler}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChattingPage;
