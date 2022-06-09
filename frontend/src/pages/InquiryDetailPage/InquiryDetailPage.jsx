import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './InquiryDetailPage.scss';

function InquiryDetailPage() {
    const navigate = useNavigate();

    const inquiryPage = () => {
        navigate(`/inquiry`);
    };

    return (
        <div className="inquirydetailpage-wrapper">
            <div className="inquirydetailpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={inquiryPage}
                    aria-hidden="true"
                />
                <div>문의하기</div>
            </div>
            <div className="inquirydetailpage-content">
                <div className="inquiry-content">
                    <p className="header">문의내용</p>
                    <p className="title">제목: </p>
                    <p className="content">(내용) </p>
                    <p className="date">작성날짜: 2022.06. </p>
                </div>
                <div className="content">
                    <p className="header">답변내용</p>
                    <p className="title">RE: </p>
                    <p className="content">(내용) </p>
                    <p className="date">작성날짜: 2022.06. </p>
                </div>
            </div>
        </div>
    );
}

export default InquiryDetailPage;
