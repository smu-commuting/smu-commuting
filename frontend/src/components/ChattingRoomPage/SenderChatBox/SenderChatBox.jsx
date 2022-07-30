/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './SenderChatBox.scss';

function SenderChatBox({ id, content, senderId, createdTime }) {
    const [showDate, setShowDate] = useState();
    const showDateChange = () => {
        setShowDate(prev => !prev);
    };
    return (
        <div className="senderchatbox-wrapper">
            <p className="content" onClick={showDateChange} aria-hidden>
                {content}
            </p>
            <div className="time">
                <p>
                    {showDate ? (
                        <span className="date">
                            {` ${createdTime.split('T')[0].split('-')[1]}월 ${
                                createdTime.split('T')[0].split('-')[2]
                            }일`}
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
