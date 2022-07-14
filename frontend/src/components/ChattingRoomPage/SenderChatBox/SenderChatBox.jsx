/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './SenderChatBox.scss';

function SenderChatBox({ id, content, senderId, createdTime }) {
    return (
        <div className="senderchatbox-wrapper">
            <p className="content">{content}</p>
        </div>
    );
}

export default SenderChatBox;
