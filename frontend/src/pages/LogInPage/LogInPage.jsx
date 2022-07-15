/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import './LogInPage.scss';
import { ReactComponent as Sumuro } from '../../assets/LogInPage/스뮤로.svg';
import Google from '../../assets/LogInPage/Google.png';
import Kakao from '../../assets/LogInPage/Kakao.png';

function LogInPage() {
    const onGoogleLogIn = useCallback(() => {
        window.location.replace(
            `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`,
        );
    }, []);
    const onKakaoLogIn = useCallback(() => {
        window.location.replace(
            `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`,
        );
    }, []);

    return (
        <div className="loginpage-wrapper">
            <div className="loginpage-inner-wrapper">
                <Sumuro className="sammulro" />
                <div className="login-btn">
                    <img
                        src={Google}
                        alt="Google"
                        onClick={onGoogleLogIn}
                        aria-hidden="true"
                    />

                    <img
                        src={Kakao}
                        alt="Kakao"
                        onClick={onKakaoLogIn}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    );
}

export default LogInPage;
