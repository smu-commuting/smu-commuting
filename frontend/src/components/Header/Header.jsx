import React, { useCallback } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../../assets/common/Header/headerlogo.png';
import headerMypage from '../../assets/common/Header/headersetting.png';
import headerTalk from '../../assets/common/Header/chatting-icon.png';

function Header() {
    const navigate = useNavigate();
    const onLogoClick = useCallback(() => {
        navigate('/home');
    }, []);
    const onChattingClick = useCallback(() => {
        navigate('/mychatlist');
    }, []);
    const onMyPageClick = useCallback(() => {
        navigate('/mypage');
    }, []);
    return (
        <div className="header-wrapper">
            <div>
                <img
                    src={headerTalk}
                    alt="대화"
                    onClick={onChattingClick}
                    aria-hidden
                />
            </div>
            <div>
                <img
                    src={headerLogo}
                    alt="로고"
                    onClick={onLogoClick}
                    aria-hidden
                />
            </div>
            <div>
                <img
                    src={headerMypage}
                    alt="마이페이지"
                    onClick={onMyPageClick}
                    aria-hidden
                />
            </div>
        </div>
    );
}

export default Header;
