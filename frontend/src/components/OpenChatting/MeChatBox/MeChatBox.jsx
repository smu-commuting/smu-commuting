/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './MeChatBox.scss';

export default function MeChatBox({ id, content, senderId, createdTime }) {
    return (
        <div className="open-mechatbox-wrapper">
            <header>
                <p>{senderId}</p>
                <p>
                    {createdTime.split('.')[1]
                        ? `${createdTime.split('.')[0].split('T')[0]} ${
                              createdTime.split('.')[0].split('T')[1]
                          }`
                        : `${createdTime.split('T')[0]} ${
                              createdTime.split('T')[1]
                          }`}
                </p>
            </header>
            <div className="content">{content}</div>
        </div>
    );
}
