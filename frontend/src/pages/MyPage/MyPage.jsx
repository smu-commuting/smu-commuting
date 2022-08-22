/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './MyPage.scss';
import { getUserInfo, logOut } from '../../modules/reducers/user';

function MyPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userProfile } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const onChangeText = e => {
        if (e.target.checked === false) {
            alert('알림설정OFF(기능연결필요)');
        } else if (e.target.checked === true) {
            alert('알림설정ON(기능연결필요)');
        }
    };

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
    const goUpdatePage = useCallback(() => {
        navigate('/updateprofile');
    }, []);
    const logOutHandler = () => {
        axios.defaults.headers.common['Authorization'] = null;
        dispatch(logOut());
        localStorage.setItem('loggedIn', false);
        navigate('/');
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
                    <img
                        className="sumung"
                        src={userProfile && userProfile.imageUrl}
                        alt="프로필사진"
                        onClick={goUpdatePage}
                        aria-hidden
                    />
                    <div className="student-info">
                        {userProfile && userProfile.studentId}
                        <br /> 상명대학교 서울캠퍼스
                    </div>
                </div>
                <button
                    className="refusal-taxi-share-btn"
                    type="submit"
                    onClick={refusalTaxiShare}
                >
                    택시 합승 거부 설정
                </button>
                {/* <button className="inquiry-btn" type="submit" onClick={inquiry}>
                    문의하기
                </button> */}
                <button
                    type="button"
                    className="logout-btn"
                    onClick={logOutHandler}
                >
                    로그아웃
                </button>
                <button
                    className="membership-withdrawal-btn"
                    type="submit"
                    onClick={membershipWithdrawal}
                >
                    회원 탈퇴
                </button>
            </div>
        </div>
    );
}

export default MyPage;
