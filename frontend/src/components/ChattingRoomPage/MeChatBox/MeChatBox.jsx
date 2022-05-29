/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './MeChatBox.scss';

function MeChatBox({ content, senderId, createdTime }) {
    return (
        <div className="mechatbox-wrapper">
            <p className="content">{content}</p>
        </div>
    );
}

export default MeChatBox;
