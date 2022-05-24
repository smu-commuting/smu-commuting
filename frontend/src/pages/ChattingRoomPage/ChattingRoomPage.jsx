/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';

function ChattingRoomPage() {
    const { id } = useParams();
    return <div className="chattingroompage-wrapper" />;
}

export default ChattingRoomPage;
