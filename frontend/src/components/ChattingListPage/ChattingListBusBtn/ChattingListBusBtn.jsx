/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChattingListBusBtn.scss';

function ChattingListBusBtn() {
    const navigate = useNavigate();
    const gotoChatroom7016 = useCallback(() => {
        navigate('/openchat/1');
    }, []);
    const gotoChatroom08 = useCallback(() => {
        navigate('/openchat/2');
    }, []);
    return (
        <div className="chattinglistbusbtn-wrapper">
            <p className="title"> &lt; 버스 오픈 채팅방 &gt;</p>
            <div className="btn-wrapper">
                <div>
                    <button type="button" onClick={gotoChatroom7016}>
                        7016
                    </button>
                </div>
                <div>
                    <button type="button" onClick={gotoChatroom08}>
                        서대문08
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChattingListBusBtn;
