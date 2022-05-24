import React, { useState } from 'react';
import './ChatInputArea.scss';
import Refusal from '../../../assets/ChattingList/ChatInputArea/합승거부.png';

function ChatInputArea() {
    const [myChat, setMyChat] = useState();
    const myChatChange = e => {
        setMyChat(e.target.value);
    };
    const onSendMyChat = () => {
        console.log(myChat);
        setMyChat('');
        // 채팅 기능 개발 여기서 부터 하면 될 듯
    };
    return (
        <div className="chatinputarea-wrapper">
            <div>
                <img src={Refusal} alt="합승거부" />
            </div>
            <textarea value={myChat} onChange={myChatChange} required />
            <button type="submit" onClick={onSendMyChat}>
                전송
            </button>
        </div>
    );
}

export default ChatInputArea;
