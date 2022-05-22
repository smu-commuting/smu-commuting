import React, { useCallback } from 'react';
import './LogInPage.scss';
import { ReactComponent as Sumuro } from '../../assets/LogInPage/스뮤로.svg';
import Google from '../../assets/LogInPage/Google.png';
import Kakao from '../../assets/LogInPage/Kakao.png';

function LogInPage() {
    const onKakaoLogIn = useCallback(() => {
        window.location.replace(
            `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`,
        );
    }, []);

    return (
        <div className="loginpage-wrapper">
            <Sumuro className="sammulro" />
            <div className="login-btn">
                <img src={Google} alt="Google" />
                <img
                    src={Kakao}
                    alt="Kakao"
                    onClick={onKakaoLogIn}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

export default LogInPage;
