/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './SenderChatBox.scss';

function SenderChatBox({ id, content, senderId, createdTime, user }) {
    const [showDate, setShowDate] = useState();
    const showDateChange = () => {
        setShowDate(prev => !prev);
    };
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div className="senderchatbox-wrapper">
            <div className="img-wrapper">
                <img src={user && user[0].profileUrl} alt="이미지" />
            </div>
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
