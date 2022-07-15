import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './ChangeMaximumModal.scss';
import cancel from '../../../assets/ChattingPage/cancel.png';
import { changeMaximumModalClick } from '../../../modules/reducers/chat';

function ChangeMaximumModal() {
    const dispatch = useDispatch();
    const changeHeadCountClick = useCallback(() => {
        dispatch(changeMaximumModalClick());
    }, [dispatch]);
    return (
        <div className="changemaximummodal-wrapper">
            <div className="changemaximummodal">
                <div className="changemaximummodal-header">
                    <img
                        className="cancel"
                        onClick={changeHeadCountClick}
                        aria-hidden
                        src={cancel}
                        alt="cancel"
                    />
                </div>
                <p className="title">최대 인원수 변경</p>
            </div>
        </div>
    );
}

export default ChangeMaximumModal;
