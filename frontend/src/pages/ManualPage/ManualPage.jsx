import React from 'react';
import { useNavigate } from 'react-router-dom';
import Close from '../../assets/ManualPage/close.png';

function ManualPage() {
    const navigate = useNavigate();

    const homePage = () => {
        navigate(`/home`);
    };

    return (
        <div className="manualpage-wrapper">
            <div className="manualpage-header">
                SMU로는 상명대학교 서울캠퍼스 학생들의 등∙하교를 돕기 위한
                애플리케이션으로 재학생 인증을 통해 사용하실 수 있습니다.
                <img
                    src={Close}
                    alt="닫기"
                    onClick={homePage}
                    aria-hidden="true"
                />
            </div>
            <div className="manualpage-content">
                <div className="bus-info">
                    <h3 className="bus-info-header">버스 정보 이용안내</h3>
                    <p className="bus-info-content">
                        ‘버스정보조회’는 학교 버스 정류장을 경유하는 버스 노선의
                        특정 정류장 도착정보와 혼잡도를 제공합니다.
                    </p>
                    <h3 className="taxi-info-header">택시 합승 이용안내</h3>
                    <p className="taxi-info-content">
                        ‘택시합승구하기’는 특정 역을 기준으로 택시 동승자를
                        구하는 서비스를 제공합니다.
                        <ol>
                            예약
                            <p>
                                원하는 택시 합승 날짜와 장소를 선택하고 해당
                                옵션에 생성된 채팅방 중 원하는 시간을 선택하여
                                입장하면 택시 합승이 완료됩니다. 만약 미리
                                생성된 채팅방이 없다면 본인이 원하는 시간대와
                                합승 인원을 선택하여 채팅방을 생성하면 됩니다.
                                <br />
                                ⚠️ 주의
                                <br />
                                택시 합승이 완료되는 것은 실제 택시를 승차하는
                                것이 아닙니다.
                                <br />
                                선택한 택시 탑승 장소 역시 실제 합승 장소가
                                아닙니다. 자세한 합승 장소는 생성된 채팅방을
                                통해 동승자와 정해주시기 바랍니다.
                                <br />
                                본인이 탑승 거부를 설정한 사용자가 포함된
                                채팅방에 입장하려고 한다면 채팅방 입장 전 주의
                                메시지가 표시됩니다.
                            </p>
                        </ol>
                        <ol>
                            채팅방
                            <p>
                                채팅방은 탑승 시각 기준 전후 1시간 동안 하나만
                                입장 가능합니다. 채팅방에 입장하게 되면 닉네임은
                                학번으로 표시됩니다. 자신이 속한 채팅방 리스트는
                                메인 화면 왼쪽 상단 아이콘을 통해 확인
                                가능합니다.
                                <br />
                                채팅방 이용 규칙은 다음과 같습니다.
                                <br />
                                1.
                            </p>
                        </ol>
                        <ol>
                            승차 거부
                            <p>
                                동승자 중 승차 거부를 설정하고 싶은 인원이
                                있다면 채팅방 왼쪽 하단의 승차 거부 아이콘을
                                통해 설정할 수 있습니다. 승차 거부는 현재
                                채팅방에 속한 인원과 나간 인원 모두 가능합니다.
                                자신이 승차 거부한 학우의 리스트는 내 정보의
                                택시 합승 거부 설정을 통해 확인 가능하며 승차
                                거부를 해제할 수도 있습니다.
                            </p>
                        </ol>
                    </p>
                    <h3 className="community-info-header">커뮤니티 이용안내</h3>
                    <p className="community-into-content">
                        커뮤니티에서는 분실물에 대한 정보와 시위 정보를
                        제공합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ManualPage;
