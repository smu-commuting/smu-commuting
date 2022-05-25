// /* eslint-disable func-names */
// import React, { useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import './ChatInputArea/ChatInputArea.scss';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ChattingRoomHeader from './ChattingRoomHeader/ChattingRoomHeader';
// import ChattingRoomPage from './ChattingRoomPage/ChattingRoomPage';
// import Refusal from '../../assets/ChattingList/ChatInputArea/합승거부.png';

// function ChattingUnionPage() {
//     const userId = useSelector(state => state.user.me.id);
//     const studentId = useSelector(state => state.user.me.studentId);
//     const { id } = useParams();
//     const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
//     const ws = Stomp.over(sock);
//     const [myChat, setMyChat] = useState();
//     const myChatChange = e => {
//         setMyChat(e.target.value);
//         console.log(myChat);
//     };

//     function connect() {
//         ws.connect(
//             {},
//             function (frame) {
//                 console.log('테스트', frame, id);
//                 ws.subscribe(`/sub/chat/room/${id}`, function (msg) {
//                     const recv = JSON.parse(msg.body);
//                     console.log(recv);
//                 });
//                 ws.send(
//                     '/pub/chat/message',
//                     {},
//                     JSON.stringify({
//                         messageType: 'ENTER',
//                         message: 'test',
//                         roomId: id,
//                         senderId: userId,
//                         studentId,
//                     }),
//                 );
//             },
//             function (error) {
//                 console.log(error);
//             },
//         );
//     }
//     connect();
//     function waitForConnection(stompClient, callback) {
//         setTimeout(
//             function () {
//                 // 연결되었을 때 콜백함수 실행
//                 if (stompClient.ws.readyState === 1) {
//                     callback();
//                     // 연결이 안 되었으면 재호출
//                 } else {
//                     waitForConnection(stompClient, callback);
//                 }
//             },
//             1, // 밀리초 간격으로 실행
//         );
//     }

//     const onSendMyChat = () => {
//         // Todo : axios
//         console.log('클릭', myChat);
//         waitForConnection(ws, function () {
//             ws.send(
//                 '/pub/chat/message',
//                 {},
//                 JSON.stringify({
//                     messageType: 'TALK',
//                     message: myChat,
//                     roomId: id,
//                     senderId: userId,
//                     studentId,
//                 }),
//             );
//         });
//         setMyChat('');
//     };
//     // const onSendMyChat = () => {
//     //     waitForConnection(ws,function() {
//     //     ws.send(
//     //         '/pub/chat/message',
//     //         {},
//     //         JSON.stringify({
//     //             messageType: 'TALK',
//     //             message: myChat,
//     //             roomId: id,
//     //             senderId: userId,
//     //             studentId,
//     //         }),
//     //     );
//     //     }
//     //     // 채팅 기능 개발 여기서 부터 하면 될 듯
//     //     setMyChat('');
//     // };

//     return (
//         <div>
//             <ChattingRoomHeader />
//             <ChattingRoomPage />
//             <div className="chatinputarea-wrapper">
//                 <div>
//                     <img src={Refusal} alt="합승거부" />
//                 </div>
//                 <textarea value={myChat} onChange={myChatChange} required />
//                 <button type="submit" onClick={onSendMyChat}>
//                     전송
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default ChattingUnionPage;

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './ChatInputArea/ChatInputArea.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChattingRoomHeader from './ChattingRoomHeader/ChattingRoomHeader';
import ChattingRoomPage from './ChattingRoomPage/ChattingRoomPage';
import Refusal from '../../assets/ChattingList/ChatInputArea/합승거부.png';

function ChattingUnionPage() {
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const { id } = useParams();
    useEffect(() => {
        console.log('룸아이디 ', id);
        console.log('유저아이디 ', userId);
    }, []);
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
    console.log(sock);
    const ws = Stomp.over(sock);
    const [myChat, setMyChat] = useState();
    const myChatChange = e => {
        setMyChat(e.target.value);
        console.log(myChat);
    };
    const onSendMyChat = () => {
        console.log(myChat);
        setMyChat('');
        // 채팅 기능 개발 여기서 부터 하면 될 듯
    };
    function connect() {
        ws.connect(
            {},
            function (frame) {
                console.log('테스트', frame, id);
                ws.subscribe(`/sub/chat/room/${id}`, function (msg) {
                    const recv = JSON.parse(msg.body);
                    console.log(recv);
                });
                ws.send(
                    '/pub/chat/message',
                    {},
                    JSON.stringify({
                        messageType: 'ENTER',
                        message: 'test',
                        roomId: id,
                        senderId: userId,
                        studentId,
                    }),
                );
            },
            function (error) {
                console.log(error);
            },
        );
    }
    connect();
    return (
        <div>
            <ChattingRoomHeader />
            <ChattingRoomPage />
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
