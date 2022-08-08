import React, { useCallback } from 'react';
import './ChattingListHeader.scss';
import { useNavigate } from 'react-router-dom';
import Back from '../../../assets/ChattingList/ChattingListHeader/Back.png';

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
                    <p>나의 채팅방</p>
                </div>
                {/* <div>
                    <img src={Talk} alt="Talk Logo" />
                </div> */}
                <div />
            </div>
        </div>
    );
}

export default ChattingListHeader;
