/* eslint-disable react/prop-types */
import React from 'react';
import './AlertChatBox.scss';

function AlertChatBox({ content }) {
    return (
        <div className="alertchatbox-wrapper">
            <p className="alertchatbox">{content}</p>
        </div>
    );
}

export default AlertChatBox;
