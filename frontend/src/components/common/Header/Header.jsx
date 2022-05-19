import React from 'react';
import './Header.scss';
import headerLogo from '../../../assets/common/Header/headerlogo.png';
import headerMypage from '../../../assets/common/Header/headersetting.png';
import headerTalk from '../../../assets/common/Header/headertalk.png';

function Header() {
    return (
        <div className="header-wrapper">
            <img src={headerTalk} alt="대화" />
            <img src={headerLogo} alt="로고" />
            <img src={headerMypage} alt="마이페이지" />
        </div>
    );
}

export default Header;
