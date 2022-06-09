import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './WithdrawalPage.scss';
import Graduation from '../../assets/WithdrawalPage/졸업.png';

function WithdrawalPage() {
    const navigate = useNavigate();

    const myPage = () => {
        navigate(`/mypage`);
    };
    const confirm = () => {
        navigate(`/confirm`);
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
            <div className="withdrawalpage-content">
                <img src={Graduation} alt="졸업" />
                <p>탈퇴하시겠습니까?</p>
                <div className="withdrawal-btn">
                    <button className="yes" type="submit" onClick={confirm}>
                        네
                    </button>
                    <button className="no" type="submit" onClick={myPage}>
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalPage;
