import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import add from '../../assets/InquiryPage/add.png';
import './lostItemPage.scss';

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
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={homePage}
                    aria-hidden="true"
                />
                <div>분실물</div>
            </div>
            <div className="lostitempage-search">
                <select>
                    <option value="습득날짜">습득날짜</option>
                    <option value="습득물품">습득물품</option>
                    <option value="습득장소">습득장소</option>
                </select>
                <input type="text" />
                <button type="submit">검색</button>
            </div>
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
