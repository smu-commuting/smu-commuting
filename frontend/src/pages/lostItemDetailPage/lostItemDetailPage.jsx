import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import Menu from '../../assets/LostItemDetailPage/menu.png';
import './lostItemDetailPage.scss';

const lostItemDetailPage = () => {
    const navigate = useNavigate();

    const lostItemPage = () => {
        navigate(`/lostitem`);
    };

    return (
        <div className="lostitemwritepage-wrapper">
            <div className="lostitemwritepage-header">
                <img
                    className="arrow"
                    src={Arrow}
                    alt="화살표"
                    onClick={lostItemPage}
                    aria-hidden="true"
                />
                <div>문의하기</div>
                <img
                    className="menu"
                    src={Menu}
                    alt="메뉴"
                    aria-hidden="true"
                />
            </div>
            <div className="lostitemwritepage-content">
                <div className="lostitem-content">
                    <div className="header">
                        <p className="date">#(날짜)</p>
                        <p className="item">#(물품이름)</p>
                        <p className="place">#(습득장소)</p>
                    </div>
                    <p className="content">(게시글 내용) </p>
                    <p className="picture">(사진)</p>
                </div>
                <div className="comment">
                    <div className="comment-header">
                        <p className="number">2019*****</p>
                        <img
                            className="menu"
                            src={Menu}
                            alt="메뉴"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="comment-content">
                        <p className="content">(댓글 내용)</p>
                        <p className="write-date">2022.06.11.23:55:02</p>
                    </div>
                </div>
            </div>
            <div className="lostitemwritepage-bottom">
                <input type="checkbox" className="checkbox" />
                <span>익명</span>
                <input type="text" className="input" />
                <button type="submit">등록</button>
            </div>
        </div>
    );
};

export default lostItemDetailPage;
