import React, { useState, useCallback } from 'react';
import './ReplyInputBox.scss';

function ReplyInputBox() {
    const [reply, setReply] = useState('');
    const onReplyChange = e => {
        console.log(e.target.value);
        setReply(e.target.value);
    };
    const onSubmitHandler = useCallback(
        e => {
            e.preventDefault();
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
