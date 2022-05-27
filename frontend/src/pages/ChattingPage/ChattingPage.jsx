/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './ChattingPage.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChattingRoomHeader from '../../components/ChattingRoomPage/ChattingRoomHeader/ChattingRoomHeader';
import Refusal from '../../assets/ChattingList/ChatInputArea/합승거부.png';

function ChattingUnionPage() {
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const { id } = useParams();
    const sock = new SockJS(`https://smulo.site/chat`);
    const ws = Stomp.over(sock);
    const [myChat, setMyChat] = useState();
    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    function connect() {
        ws.connect(
            {},
            function (frame) {
                ws.subscribe(`/sub/chat/room/${id}`, function (msg) {
                    const recv = JSON.parse(msg.body);
                    console.log(recv); // 보낸 메세지, 온 메세지
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

    const onSendMyChat = () => {
        // Todo : axios
        console.log('클릭', myChat);
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
    };

    return (
        <div className="chattingpage-wrapper">
            <ChattingRoomHeader />
            <div className="chattingroompage-wrapper" />
            <div className="chatinputarea-wrapper">
                <div>
                    <img src={Refusal} alt="합승거부" />
                </div>
                <textarea value={myChat} onChange={myChatChange} required />
                <button type="submit" onClick={onSendMyChat}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChattingUnionPage;
