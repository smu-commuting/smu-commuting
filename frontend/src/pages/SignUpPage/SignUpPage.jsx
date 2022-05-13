import React from 'react';
import './SignUpPage.scss';
import Search from '../../assets/SignUpPage/검색.png';

function SignUpPage() {
    return (
        <div className="signuppage-wrapper">
            <div className="signup-header">
                <img src={Search} alt="검색" />
                <div>
                    우리학교
                    <br /> 인증이 필요해요:)
                </div>
            </div>
            <div className="signup-middle">
                <p>학번을 입력해 주세요</p>
                <div>
                    <input />
                    <p>@sangmyung.kr</p>
                </div>
                <button className="student-id-btn" type="submit">
                    인증번호 전송하기
                </button>
            </div>
            <div className="signup-bottom">
                <p>전송된 인증번호를 입력해 주세요</p>
                <div>
                    <input />
                    <p>5:00</p>
                </div>
                <button className="student-id-btn" type="submit">
                    인증 후 가입하기
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
