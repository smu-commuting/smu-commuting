import React, { useCallback } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../../assets/common/Header/headerlogo.png';
import headerMypage from '../../assets/common/Header/headersetting.png';
import headerTalk from '../../assets/common/Header/headertalk.png';

function Header() {
    const navigate = useNavigate();
    const onLogoClick = useCallback(() => {
        navigate('/home');
    }, []);
    const onChattingClick = useCallback(() => {
        navigate('/chatlist');
    }, []);
    return (
        <div className="header-wrapper">
            <img
                src={headerTalk}
                alt="대화"
                onClick={onChattingClick}
                aria-hidden
            />
            <img
                src={headerLogo}
                alt="로고"
                onClick={onLogoClick}
                aria-hidden
            />
            <img src={headerMypage} alt="마이페이지" />
        </div>
    );
}

export default Header;
