/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
    const {
        chatMessageList,
        chatMessageListLoading,
        chatLoadEnd,
        chatMessageListDone,
    } = useSelector(state => state.chat);

    const [prevHeight, setPrevHeight] = useState();
    const [messageBottle, setMessageBottle] = useState([]);
    const [myChat, setMyChat] = useState();
    // const [liveChat, setLiveChat] = useState([]);
    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    function connect() {
        ws.connect(
            {},
            function (frame) {
                ws.subscribe(`/sub/chat/room/${id}`, function (msg) {
                    const recv = JSON.parse(msg.body);
                    setMessageBottle([...messageBottle, recv]);
                    window.scrollTo(0, document.body.offsetHeight + 20);
                });
            },
            function (error) {
                console.log(error);
            },
        );
    }
    connect();

    function waitForConnection(stompClient, callback) {
        setTimeout(
            function () {
                // 연결되었을 때 콜백함수 실행
                if (stompClient.ws.readyState === 1) {
                    callback();
                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(stompClient, callback);
                }
            },
            1, // 밀리초 간격으로 실행
        );
    }

    // 처음 들어올 때
    useEffect(() => {
        connect();
        dispatch(
            getChatMessageList({
                roomId: id,
                size: 10,
                date: firstEnterDateParser(),
            }),
        );
        setTimeout(() => {
            window.scrollTo(0, document.body.offsetHeight);
            setPrevHeight(document.body.offsetHeight);
        }, 100);
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
        waitForConnection(ws, function () {
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
        });
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
