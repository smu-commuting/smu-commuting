/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.scss';
import axios from 'axios';
import Search from '../../assets/SignUpPage/검색.png';

function SignUpPage() {
    const navigate = useNavigate();
    const [checkSend, setCheckSend] = useState(false);
    const [studentId, setStudentId] = useState(''); // 학번
    const [authNum, setAuthNum] = useState(''); // 인증번호

    const onStudentIdChange = e => {
        if (studentId.length > 8) {
            alert('학번은 9자리 이내로 입력 가능합니다.');
            setStudentId('');
        } else {
            setStudentId(e.target.value);
        }
    };

    const onAuthNumChange = e => {
        setAuthNum(e.target.value);
    };

    const sendNumber = async () => {
        const response = await axios.post(
            'http://13.124.109.54/api/user/email',
            JSON.stringify(`${studentId}@sangmyung.kr`),
            {
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            },
        );
        if (response.data.success) {
            setCheckSend(true);
        }
    };

    const postAuthNum = async () => {
        const response = await axios.post(
            'http://13.124.109.54/api/user/email/verification',
            JSON.stringify(authNum),
            {
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            },
        );
        if (response.data.success) {
            const userInfo = {
                email: `${studentId}@sangmyung.kr`,
                studentId,
            };
            const responseSignup = await axios.post(
                'http://13.124.109.54/api/user/signup',
                JSON.stringify(userInfo),
                {
                    headers: {
                        'Content-Type': `application/json`,
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken',
                        )}`,
                    },
                },
            );
            if (responseSignup.data.success) {
                alert('회원가입이 완료되었습니다.');
                navigate('/home');
            }
        }
    };
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
                    <input
                        type="number"
                        value={studentId}
                        onChange={onStudentIdChange}
                        required
                    />
                    <p>@ sangmyung.kr</p>
                </div>
                <button
                    className="student-id-btn"
                    type="submit"
                    onClick={sendNumber}
                >
                    인증번호 전송하기
                </button>
            </div>
            {checkSend && (
                <div className="signup-bottom">
                    <p>전송된 인증번호를 입력해 주세요</p>
                    <div>
                        <input
                            type="number"
                            value={authNum}
                            onChange={onAuthNumChange}
                            required
                        />
                        <p>5:00</p>
                    </div>
                    <button
                        className="student-id-btn"
                        type="submit"
                        onClick={postAuthNum}
                    >
                        인증 후 가입하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignUpPage;
