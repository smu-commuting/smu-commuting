import React from 'react';
import sumungLoading from '../../assets/LogInProcess/수뭉이-뱃지2.png';
import './LoadingPage.scss';

function LoadingPage() {
    return (
        <div className="loadingpage-wrapper">
            <img src={sumungLoading} alt="loading" />
        </div>
    );
}

export default LoadingPage;
