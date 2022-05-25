import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './WithdrawalPage.scss';

function WithdrawalPage() {
    const navigate = useNavigate();

    const myPage = async () => {
        navigate(`/mypage`);
    };

    return (
        <div className="wthdrawalpage-wrapper">
            <div className="wthdrawalpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>회원 탈퇴</div>
            </div>
        </div>
    );
}

export default WithdrawalPage;
