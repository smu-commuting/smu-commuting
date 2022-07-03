/* eslint-disable dot-notation */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Arrow from '../../assets/MyPage/arrow.png';
import './WithdrawalConfirmPage.scss';
import { deleteUserApi } from '../../utils/authApi';

function WithdrawalConfirmPage() {
    const { me } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const onIdChange = useCallback(
        e => {
            setId(e.target.value);
        },
        [id],
    );
    const onSubmit = useCallback(() => {
        if (!id) return;
        if (parseInt(me.studentId, 10) === parseInt(id, 10)) {
            deleteUserApi().then(res => {
                axios.defaults.headers.common['Authorization'] = null;
                navigate('/');
            });
        } else {
            alert('본인의 학번과 일치하지 않습니다.');
        }
    }, [id]);
    const myPage = () => {
        navigate(`/mypage`);
    };

    return (
        <div className="wthdrawalconfirmpage-wrapper">
            <div className="wthdrawalconfirmpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>회원 탈퇴</div>
            </div>
            <div className="wthdrawalconfirmpage-content">
                <p>학번을 입력해주세요.</p>
                <div className="studentid-input">
                    <input
                        type="number"
                        onChange={onIdChange}
                        placeholder="*********"
                    />
                    <button
                        className="confirm-btn"
                        type="submit"
                        onClick={onSubmit}
                    >
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalConfirmPage;
