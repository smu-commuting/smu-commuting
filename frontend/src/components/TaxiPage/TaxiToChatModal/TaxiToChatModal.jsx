import React from 'react';
import { useSelector } from 'react-redux';
import './TaxiToChatModal.scss';

function TaxiToChatModal() {
    const { chattingRoomInfo } = useSelector(state => state.taxi);
    return (
        <div className="taxitochatmodal-wrapper">
            {chattingRoomInfo.placeName}
            {chattingRoomInfo.taxiPartyId}
            {chattingRoomInfo.time}
        </div>
    );
}

export default TaxiToChatModal;
