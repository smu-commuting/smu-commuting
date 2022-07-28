/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './MeChatBox.scss';

function MeChatBox({ id, content, senderId, createdTime }) {
    return (
        <div className="mechatbox-wrapper">
            <div className="time">
                <p>{`${createdTime.split('T')[1].split(':')[0]}:${
                    createdTime.split('T')[1].split(':')[1]
                }`}</p>
            </div>
            <p className="content">{content}</p>
        </div>
    );
}

export default MeChatBox;
