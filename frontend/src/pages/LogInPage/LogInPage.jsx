import React, { useCallback } from 'react';
import './LogInPage.scss';
import { ReactComponent as Sammulro } from '../../assets/LogInPage/샘물로.svg';
import Sumung from '../../assets/LogInPage/수뭉이-뱃지1.png';
import Google from '../../assets/LogInPage/Google.png';
import Kakao from '../../assets/LogInPage/Kakao.png';

function LogInPage() {
    const onKakaoLogIn = useCallback(() => {
        window.location.replace(
            'http://13.124.109.54/oauth2/authorization/kakao',
        );
    }, []);

    return (
        <div className="loginpage-wrapper">
            <Sammulro className="sammulro" />
            <img className="sumung" src={Sumung} alt="Sumung" />
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
