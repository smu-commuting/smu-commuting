/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './OpenChattingPage.scss';

function OpenChattingPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [myChat, setMyChat] = useState();

    useEffect(() => {
        // dispatch(버스 오픈 채팅(id))
    }, [dispatch]);

    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    const onSubmitHandler = () => {
        if (!myChat) return;
        setMyChat('');
    };

    return (
        <div className="openchattingpage-wrapper">
            <div className="input-area">
                <textarea value={myChat} onChange={myChatChange} required />
                <button type="submit" onClick={onSubmitHandler}>
                    전송
                </button>
            </div>
            <div className="openchatting-list">리스트 영역</div>
        </div>
    );
}

export default OpenChattingPage;
