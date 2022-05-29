import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/MyPage/수뭉이프로필.svg';
import Arrow from '../../assets/MyPage/arrow.png';
import './MyPage.scss';

function MyPage() {
    const navigate = useNavigate();
    const onChangeText = e => {
        if (e.target.checked === false) {
            alert('알림설정OFF(기능연결필요)');
        } else if (e.target.checked === true) {
            alert('알림설정ON(기능연결필요)');
        }
    };
    const [studentId] = useState(''); // 학번

    const homePage = () => {
        navigate(`/home`);
    };
    const refusalTaxiShare = () => {
        navigate(`/refusal`);
    };
    const membershipWithdrawal = () => {
        navigate(`/withdrawal`);
    };
    const inquiry = () => {
        navigate(`/inquiry`);
    };

    return (
        <div className="mypage-wrapper">
            <div className="mypage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={homePage}
                    aria-hidden="true"
                />
                <div className="setting">
                    <div>내 정보</div>
                </div>
            </div>
            <div className="mypage-content">
                <div className="std-profile">
                    <img clsssName="sumung" src={Profile} alt="프로필사진" />
                    <div>
                        {studentId}
                        <br /> 상명대학교 서울캠퍼스
                    </div>
                </div>
                <div className="notification-setting">
                    <p>알림 설정</p>
                    <div className="toggleSwitch">
                        <label className="label" htmlFor="toggleSwitch">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="toggleSwitch"
                                onClick={onChangeText}
                            />
                            <span className="switch" />
                        </label>
                    </div>
                </div>
                <button
                    className="refusal-taxi-share-btn"
                    type="submit"
                    onClick={refusalTaxiShare}
                >
                    택시 합승 거부 설정
                </button>
                <button
                    className="membership-withdrawal-btn"
                    type="submit"
                    onClick={membershipWithdrawal}
                >
                    회원 탈퇴
                </button>
                <button className="inquiry-btn" type="submit" onClick={inquiry}>
                    문의하기
                </button>
            </div>
        </div>
    );
}

export default MyPage;
