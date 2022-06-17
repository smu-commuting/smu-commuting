import React, { useCallback } from 'react';
import './ChattingListHeader.scss';
import { useNavigate } from 'react-router-dom';
import Back from '../../../assets/ChattingList/ChattingListHeader/Back.png';
import Talk from '../../../assets/ChattingList/ChattingListHeader/talk1.png';

function ChattingListHeader() {
    const navigate = useNavigate();
    const onBackClick = useCallback(() => {
        navigate('/home');
    }, []);
    return (
        <div className="chattinglistheader-wrapper">
            <div className="logo-wrapper">
                <div>
                    <img
                        src={Back}
                        alt="뒤로가기"
                        onClick={onBackClick}
                        aria-hidden
                    />
                </div>
                <div>
                    <img src={Talk} alt="Talk Logo" />
                </div>
                <div />
            </div>
            <p>합승 Talk</p>
        </div>
    );
}

export default ChattingListHeader;
