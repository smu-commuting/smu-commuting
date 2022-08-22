/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import './SenderChatBox.scss';

function SenderChatBox({ id, content, senderId, createdTime, userImg }) {
    const [showDate, setShowDate] = useState();
    const showDateChange = () => {
        setShowDate(prev => !prev);
    };
    return (
        <div className="senderchatbox-wrapper">
            <div className="left">
                <div className="inner-wrapper">
                    <div className="img-wrapper">
                        <img src={userImg} alt="이미지" />
                    </div>
                    <p className="sender-id">{senderId}</p>
                </div>
            </div>
            <p className="content" onClick={showDateChange} aria-hidden>
                {content}
            </p>
            <div className="time">
                <p>
                    {showDate ? (
                        <span className="date">
                            {` ${createdTime.split('T')[0].split('-')[1]}/${
                                createdTime.split('T')[0].split('-')[2]
                            }`}
                        </span>
                    ) : (
                        <span className="clock">
                            {` ${createdTime.split('T')[1].split(':')[0]}:${
                                createdTime.split('T')[1].split(':')[1]
                            }`}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}

export default SenderChatBox;
