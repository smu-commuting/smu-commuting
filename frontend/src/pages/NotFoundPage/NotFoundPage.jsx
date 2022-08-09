import React from 'react';
import NotFound from '../../assets/NotFoundPage/notfound.png';
import './NotFoundPage.scss';

export default function NotFoundPage() {
    return (
        <div className="notfoundpage-wrapper">
            <div className="inner-wrapper">
                <img src={NotFound} alt="notfound" />
                <p>찾을 수 없는 페이지 입니다.</p>
            </div>
        </div>
    );
}
