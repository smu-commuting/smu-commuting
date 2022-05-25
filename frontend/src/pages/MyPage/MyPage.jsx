import React from 'react';
import { useNavigate } from 'react-router-dom';
import Setting from '../../assets/MyPage/setting.png';
import Profile from '../../assets/MyPage/수뭉이프로필.svg';
import Arrow from '../../assets/MyPage/arrow.png';
import './MyPage.scss';

function MyPage() {
    const navigate = useNavigate();

    const homePage = async () => {
        navigate(`/home`);
    };
    const refusalTaxiShare = async () => {
        navigate(`/refusal`);
    };
    const notificationSetting = async () => {
        navigate(`/notification`);
    };
    const membershipWithdrawal = async () => {
        navigate(`/withdrawal`);
    };
    const inquiry = async () => {
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
                    <img src={Setting} alt="설정" />
                    <div>내 정보</div>
                </div>
            </div>
            <div className="mypage-content">
                <div className="std-profile">
                    <img clsssName="sumung" src={Profile} alt="프로필사진" />
                    <div>
                        학번
                        <br /> 상명대학교 서울캠퍼스 (학번)
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
                    className="notification-setting-btn"
                    type="submit"
                    onClick={notificationSetting}
                >
                    알림 설정
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
