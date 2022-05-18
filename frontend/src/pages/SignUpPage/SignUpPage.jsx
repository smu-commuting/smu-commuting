/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { postAuthNumAPI, sendNumberAPI } from '../../modules/api';
import './SignUpPage.scss';
import Search from '../../assets/SignUpPage/검색.png';
import { signupRequest } from '../../modules/reducers/user';
import { sendNumberApi, verificationNumApi } from '../../utils';

function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signupDone } = useSelector(state => state.user);
    const [checkSend, setCheckSend] = useState(false);
    const [studentId, setStudentId] = useState(''); // 학번
    const [authNum, setAuthNum] = useState(''); // 인증번호

    // console.log(signupDone);
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

    // 인증번호 요청 API
    const sendNumber = async () => {
        const response = await sendNumberApi(studentId);
        if (response.data.success) setCheckSend(true);
    };

    // 인증번호 검사 API
    const postAuthNum = async () => {
        const response = await verificationNumApi(authNum);
        if (response.data.success) {
            const userInfo = {
                email: `${studentId}@sangmyung.kr`,
                studentId,
            };
            dispatch(signupRequest(userInfo));
            alert('가입을 축하합니다.');
            navigate(`/home`);
        } else {
            alert('올바른 인증번호가 아닙니다.');
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
