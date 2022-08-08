/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './SenderChatBox.scss';

export default function SenderChatBox({ id, content, senderId, createdTime }) {
    return (
        <div className="open-senderchatbox-wrapper">
            <header>
                {/* <p>{`${String(senderId).substring(0, 4)}*****`}</p> */}
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
