import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './inquiryWritePage.scss';

const inquiryWritePage = () => {
    const navigate = useNavigate();

    const inquiryPage = () => {
        navigate(`/inquiry`);
    };

    return (
        <div className="inquirywritepage-wrapper">
            <div className="inquirywritepage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={inquiryPage}
                    aria-hidden="true"
                />
                <div>문의하기</div>
                <button className="regist-btn" type="submit">
                    등록
                </button>
            </div>
            <div className="inquirywritepage-content">
                <p className="header">제목을 입력해주세요.</p>
                <p className="content">내용을 입력해주세요. </p>
            </div>
        </div>
    );
};

export default inquiryWritePage;
