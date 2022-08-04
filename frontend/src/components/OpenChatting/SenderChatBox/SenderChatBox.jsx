/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './SenderChatBox.scss';

export default function SenderChatBox({ id, content, senderId, createdTime }) {
    return <div className="open-senderchatbox-wrapper">{content}</div>;
}
