import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './ProtestPage.scss';
import Police from '../../assets/ProtestPage/서울지방경찰청.png';
import Detour from '../../assets/ProtestPage/교통.png';

function ProtestPage() {
    const navigate = useNavigate();

    const homePage = () => {
        navigate(`/home`);
    };

    return (
        <div className="protestpage-wrapper">
            <div className="protestpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={homePage}
                    aria-hidden="true"
                />
                <div>시위 및 우회정보</div>
            </div>
            <div className="content-wrapper">
                <p className="main-content">
                    로고를 클릭하면 해당 페이지로 이동합니다.
                </p>
                <div className="inner-wrapper">
                    <div className="protest">
                        <div className="logo-wrapper">
                            <img
                                src={Police}
                                alt="서울경찰청"
                                onClick={() =>
                                    window.open(
                                        'https://www.smpa.go.kr/user/nd54882.do',
                                        '_blank',
                                    )
                                }
                                aria-hidden
                            />
                        </div>
                        <p>오늘의 집회 / 시위정보</p>
                    </div>
                    <div className="detour">
                        <div className="logo-wrapper">
                            <img
                                src={Detour}
                                alt="교통우회"
                                onClick={() =>
                                    window.open(
                                        'http://topis.seoul.go.kr/map/openControlMap.do',
                                        '_blank',
                                    )
                                }
                                aria-hidden
                            />
                            <p>오늘의 버스 우회정보</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProtestPage;
