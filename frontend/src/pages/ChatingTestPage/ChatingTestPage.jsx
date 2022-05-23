import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './ChatingTestPage.scss';
import talkList from '../../assets/ChatingTestPage/talkList.png';
import out from '../../assets/ChatingTestPage/out.png';
import block from '../../assets/ChatingTestPage/block.png';

function ChatingTestPage() {
    const sock = new SockJS('http://localhost:8080/chat');
    const ws = Stomp.over(sock);
    const [chatList, setChatList] = useState([]);
    const [myAsk, setMyAsk] = useState();
    const myAskChange = e => {
        // console.log(e.target.value);
        setMyAsk(e.target.value);
    };
    const myChatSend = () => {
        setMyAsk('');
        setChatList([...chatList, { me: true, talk: myAsk }]);
    };

    function connect() {
        ws.connect(
            {},
            function (frame) {
                console.log(frame);
                ws.subscribe('/sub/chat/room/1', function (msg) {
                    const recv = JSON.parse(msg.body);
                    console.log(recv);
                });
                ws.send(
                    '/pub/chat/message',
                    {},
                    JSON.stringify({
                        messageType: 'ENTER',
                        roomId: 1,
                        senderId: 1,
                        studentId: 1234,
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
        <div className="chatingtestpage-wrapper">
            <div className="chat-header">
                <img src={talkList} alt="리스트" />
                <div>남영역 09 : 35 </div>
                <img src={out} alt="나가기" />
            </div>
            <ul className="chat-body">
                {chatList.map(chat => {
                    if (chat.me) {
                        return (
                            <li className="my" key={chat.talk}>
                                {chat.talk}
                            </li>
                        );
                    }
                    return (
                        <li className="not-mine" key={chat.talk}>
                            {chat.talk}
                        </li>
                    );
                })}
            </ul>
            <div className="user-input">
                <img src={block} alt="차단" />
                <textarea value={myAsk} onChange={myAskChange} required />
                <button type="submit" onClick={myChatSend}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatingTestPage;