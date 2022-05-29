/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './MeChatBox.scss';

function MeChatBox({ id, content, senderId, createdTime }) {
    return (
        <div className="mechatbox-wrapper">
            <p className="content">{content}</p>
            <p>{id}</p>
        </div>
    );
}

export default MeChatBox;
