/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { postAuthNumAPI, sendNumberAPI } from '../../modules/api';
import './SignUpPage.scss';
import Search from '../../assets/SignUpPage/검색.png';
import { signupRequest } from '../../modules/reducers/user';
import { sendNumberApi, signupApi, verificationNumApi } from '../../utils';
import Timer from '../../components/common/Timer';

function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checkSend, setCheckSend] = useState(false);
    const [studentId, setStudentId] = useState(''); // 학번
    const [authNum, setAuthNum] = useState(''); // 인증번호

    const [email, setEmail] = useState('naver.com');

    const onStudentIdChange = e => {
        setStudentId(e.target.value);
        // if (studentId.length > 8) {
        //     alert('학번은 9자리 이내로 입력 가능합니다.');
        //     setStudentId('');
        // } else {
        //     setStudentId(e.target.value);
        // }
    };

    const onAuthNumChange = e => {
        setAuthNum(e.target.value);
    };

    const onEmailChange = e => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    // 인증번호 요청 API
    const sendNumber = async () => {
        // if (studentId.length < 8) return;
        if (studentId.length === 0) return;
        console.log(`${studentId}@${email}`);
        const response = await sendNumberApi(studentId, email);
        if (response.data.success) setCheckSend(true);
    };

    // 인증번호 검사 API
    const postAuthNum = async () => {
        verificationNumApi(authNum)
            .then(res => {
                console.log('인증 성공', res);
                const userInfo = {
                    // email: `${studentId}@sangmyung.kr`,
                    email: `${studentId}@${email}`,
                    studentId,
                    imageId: 1,
                };
                console.log(userInfo);
                signupApi(userInfo)
                    .then(response => {
                        console.log('응답 data', response);
                        const userInfo = {
                            studentId: response.data.data.studentId,
                            id: response.data.data.userId,
                        };
                        dispatch(signupRequest(userInfo));
                        navigate('/home');
                        localStorage.setItem('loggedIn', true);
                    })
                    .catch(err => {
                        console.log(err);
                        // 중복된 이메일
                        alert(err.response.data.error.info);
                        setCheckSend(false);
                        setStudentId('');
                        setAuthNum('');
                    });
                // dispatch(signupRequest(userInfo));
            })
            .catch(err => {
                // 잘못된 인증번호
                alert(err.response.data.error.info);
                setAuthNum('');
            });
    };
    return (
        <div className="signuppage-wrapper">
            <div className="signup-header">
                <img src={Search} alt="검색" />
                <div>
                    {/* 우리학교 */}
                    <br /> 인증이 필요해요:)
                </div>
            </div>
            <div className="signup-middle">
                <p>이메일을 입력해 주세요</p>
                <div>
                    <input
                        // type="number"
                        value={studentId}
                        onChange={onStudentIdChange}
                        required
                    />
                    <p>@</p>
                    <select onChange={onEmailChange}>
                        <option selected>naver.com</option>
                        <option>gmail.com</option>
                    </select>
                    {/* <p>@ sangmyung.kr</p> */}
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
                        <Timer mm={5} ss={0} />
                    </div>
                    {/* <p
                        className="info"
                        onClick={() =>
                            window.open(
                                'https://outlook.office.com/mail/inbox',
                                '_blank',
                            )
                        }
                        aria-hidden
                    >
                        인증번호 확인하기
                    </p> */}
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
