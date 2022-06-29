import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './ProtestPage.scss';
import Police from '../../assets/ProtestPage/서울지방경찰청.png';

function ProtestPage() {
    const navigate = useNavigate();

    const homePage = () => {
        navigate(`/home`);
    };

    const gotoProtestHomePage = useCallback(() => {
        window.location.replace('https://www.smpa.go.kr/user/nd54882.do');
    }, []);

    return (
        <div className="protestpage-wrapper">
            <div className="protestpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={homePage}
                    aria-hidden="true"
                />
                <div>시위정보</div>
            </div>
            <div className="protestpage-content">
                <img
                    src={Police}
                    alt="서울경찰청"
                    onClick={gotoProtestHomePage}
                    aria-hidden
                />
                <p>
                    오늘의 집회 / 시위정보는
                    <br />
                    서울경찰청 홈페이지에서 확인할 수 있습니다.
                    <br />
                    로고를 클릭하면 해당 페이지로 연결됩니다.
                </p>
            </div>
        </div>
    );
}

export default ProtestPage;
