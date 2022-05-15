/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import './SignUpPage.scss';
import axios from 'axios';
import Search from '../../assets/SignUpPage/검색.png';

function SignUpPage() {
    // const [checkSend, setCheckSend] = useState();
    const [studentId, setStudentId] = useState('');

    const onStudentIdChange = e => {
        setStudentId(e.target.value);
        // if (studentId.length > 8) {
        //     alert('학번은 9자리 이내로 입력 가능합니다.');
        //     setStudentId('');
        // } else {
        //     setStudentId(e.target.value);
        // }
    };

    const sendNumber = async () => {
        const formData = new FormData();
        formData.append('email', `${studentId}@gmail.com`);
        const response = await axios.post(
            'http://13.124.109.54/api/user/email',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            },
        );
        console.log(response.data);
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
                        // type="number"
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
