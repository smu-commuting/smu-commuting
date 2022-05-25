import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './RefusalTaxiSharePage.scss';

function RefusalTaxiSharePage() {
    const navigate = useNavigate();

    const myPage = async () => {
        navigate(`/mypage`);
    };

    return (
        <div className="refusaltaxisharepage-wrapper">
            <div className="refusaltaxisharepage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>택시 합승 거부 설정</div>
            </div>
            <div className="refusaltaxisharepage-content">
                <div>총 n명의 학우를 탑승 거부하였습니다.</div>
                <div className="refusal-list">
                    <p>(학번)</p>
                    <button type="submit">해제</button>
                </div>
            </div>
        </div>
    );
}

export default RefusalTaxiSharePage;
