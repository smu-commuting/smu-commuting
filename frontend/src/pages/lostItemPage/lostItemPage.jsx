/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import add from '../../assets/InquiryPage/addcopy.png';
import './lostItemPage.scss';
import LostItemSearch from '../../components/CommunityPage/LostItemSearch/LostItemSearch';

const lostItemPage = () => {
    const navigate = useNavigate();

    const homePage = () => {
        navigate(`/home`);
    };

    const lostItemWrite = () => {
        navigate(`/lostitemwrite`);
    };

    return (
        <div className="lostitempage-wrapper">
            <div className="lostitempage-header">
                <div className="arrow-wrapper">
                    <img
                        src={Arrow}
                        alt="화살표"
                        onClick={homePage}
                        aria-hidden="true"
                    />
                </div>
                <div className="title">분실물</div>
                <div />
            </div>
            {/* <LostItemSearch /> */}
            <div className="lostitempage-content">
                <p className="picture">사진</p>
                <p className="date">날짜</p>
                <p className="item">물품</p>
                <p className="place">장소</p>
            </div>
            <img
                className="add"
                src={add}
                alt="add"
                onClick={lostItemWrite}
                aria-hidden
            />
        </div>
    );
};

export default lostItemPage;
