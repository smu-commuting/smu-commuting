import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postReply } from '../../../modules/reducers/community';
import './ReplyInputBox.scss';

function ReplyInputBox() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reply, setReply] = useState('');
    const onReplyChange = e => {
        setReply(e.target.value);
    };
    const onSubmitHandler = useCallback(
        e => {
            e.preventDefault();
            if (reply === '') return;
            const data = {
                id,
                reply,
            };
            dispatch(postReply(data));
            setReply('');
        },
        [reply],
    );
    return (
        <div className="replyinputbox-wrapper">
            <textarea value={reply} onChange={onReplyChange} required />
            <button type="submit" onClick={onSubmitHandler}>
                등록
            </button>
        </div>
    );
}

export default ReplyInputBox;
