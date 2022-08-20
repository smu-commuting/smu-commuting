/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import outpeople from '../../../assets/ChattingPage/outpeople.png';
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
                <img
                    src={user.length !== 0 ? user[0].profileUrl : outpeople}
                    alt="이미지"
                />
            </div>
            <div className="middle">
                <p className="sender-id">{senderId}</p>
                <p className="content" onClick={showDateChange} aria-hidden>
                    {content}
                </p>
            </div>
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
