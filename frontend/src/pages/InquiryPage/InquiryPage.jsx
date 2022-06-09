import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './InquiryPage.scss';

function InquiryPage() {
    const navigate = useNavigate();

    const myPage = () => {
        navigate(`/mypage`);
    };

    return (
        <div className="inquirypage-wrapper">
            <div className="inquirypage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>문의하기</div>
            </div>
            <div className="inquirypage-search">
                <select>
                    <option value="날짜">날짜</option>
                    <option value="제목">제목</option>
                    <option value="답변여부">답변여부</option>
                </select>
                <input type="number" />
                <button type="submit">검색</button>
            </div>
            <div className="inquirypage-content">
                <p className="date">작성날짜</p>
                <p className="title">제목</p>
                <p className="reply">답변여부</p>
            </div>
        </div>
    );
}

export default InquiryPage;
