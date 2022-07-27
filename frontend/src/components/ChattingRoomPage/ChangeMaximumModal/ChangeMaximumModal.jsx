/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChangeMaximumModal.scss';
import cancel from '../../../assets/ChattingPage/cancel.png';
import {
    changeMaximum,
    changeMaximumModalClick,
} from '../../../modules/reducers/chat';

function ChangeMaximumModal() {
    const dispatch = useDispatch();
    const { chattingRoomInfo } = useSelector(state => state.taxi);
    const [maximum, setMaximum] = useState(chattingRoomInfo.maximum);
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const changeHeadCountClick = useCallback(() => {
        dispatch(changeMaximumModalClick());
    }, [dispatch]);
    const onChangeSubmit = useCallback(() => {
        const data = {
            id: chattingRoomInfo.taxiPartyId,
            maximum,
        };
        console.log(data);
        dispatch(changeMaximum(data));
    }, [maximum]);
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
                <div className="headcount-wrapper">
                    <div
                        className={
                            maximum === 2
                                ? 'active-headcount'
                                : 'non-active-headcount'
                        }
                        onClick={() => {
                            setMaximum(2);
                        }}
                        aria-hidden
                    >
                        2명
                    </div>
                    <div
                        className={
                            maximum === 3
                                ? 'active-headcount'
                                : 'non-active-headcount'
                        }
                        onClick={() => {
                            setMaximum(3);
                        }}
                        aria-hidden
                    >
                        3명
                    </div>
                    <div
                        className={
                            maximum === 4
                                ? 'active-headcount'
                                : 'non-active-headcount'
                        }
                        onClick={() => {
                            setMaximum(4);
                        }}
                        aria-hidden
                    >
                        4명
                    </div>
                </div>
                <button
                    className="change"
                    type="submit"
                    onClick={onChangeSubmit}
                >
                    인원 변경하기
                </button>
            </div>
        </div>
    );
}

export default ChangeMaximumModal;
