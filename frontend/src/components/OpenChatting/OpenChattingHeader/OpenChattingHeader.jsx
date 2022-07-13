import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OpenChattingHeader.scss';
import cancel from '../../../assets/OpenChatting/cancel.png';

function OpenChattingHeader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/chatlist');
    };
    return (
        <div className="openchattingheader-wrapper">
            <div />
            {id === '7016' ? (
                <div>7016 번 버스 채팅방</div>
            ) : (
                <div>서대문 08번 버스 채팅방</div>
            )}
            <div onClick={goBack} aria-hidden>
                <img src={cancel} alt="cancel" />
            </div>
        </div>
    );
}

export default OpenChattingHeader;
