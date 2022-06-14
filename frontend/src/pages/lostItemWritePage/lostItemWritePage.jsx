import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import picture from '../../assets/LostItemWritePage/picture.png';
import './lostItemWritePage.scss';

const lostItemWritePage = () => {
    const navigate = useNavigate();

    const inquiryPage = () => {
        navigate(`/inquiry`);
    };

    return (
        <div className="lostitemwritepage-wrapper">
            <div className="lostitemwritepage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={inquiryPage}
                    aria-hidden="true"
                />
                <div>분실물 습득 글 쓰기</div>
                <button className="regist-btn" type="submit">
                    등록
                </button>
            </div>
            <div className="lostitemwritepage-content">
                <p className="header">제목을 입력해주세요.</p>
                <p className="content">내용을 입력해주세요. </p>
            </div>
            <img
                className="picture"
                src={picture}
                alt="picture"
                // onClick={}
                aria-hidden
            />
        </div>
    );
};

export default lostItemWritePage;
