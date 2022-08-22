/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './MeChatBox.scss';

function MeChatBox({ id, content, senderId, createdTime }) {
    const [showDate, setShowDate] = useState();
    const showDateChange = () => {
        setShowDate(prev => !prev);
    };
    return (
        <div className="mechatbox-wrapper">
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
            <p className="content" onClick={showDateChange} aria-hidden>
                {content}
            </p>
        </div>
    );
}

export default MeChatBox;
