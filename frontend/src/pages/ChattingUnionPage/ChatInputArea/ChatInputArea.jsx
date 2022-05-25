/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './ChatInputArea.scss';
import Refusal from '../../../assets/ChattingList/ChatInputArea/합승거부.png';

function ChatInputArea({ myChat, setMyChat, myChatChange, onSendMyChat }) {
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
