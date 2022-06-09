import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './WithdrawalConfirmPage.scss';

function WithdrawalConfirmPage() {
    const navigate = useNavigate();
    const myPage = () => {
        navigate(`/mypage`);
    };
    const LogInPage = () => {
        navigate(`/`);
    };

    return (
        <div className="wthdrawalconfirmpage-wrapper">
            <div className="wthdrawalconfirmpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>회원 탈퇴</div>
            </div>
            <div className="wthdrawalconfirmpage-content">
                <p>학번을 입력해주세요.</p>
                <div className="studentid-input">
                    <input type="number" />
                    <button
                        className="confirm-btn"
                        type="submit"
                        onClick={LogInPage}
                    >
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalConfirmPage;
