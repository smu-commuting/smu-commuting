/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Close from '../../assets/BusPage/cancel.png';
import './ManualPage.scss';
import Movie from '../../assets/ManualPage/매뉴얼및홍보영상.mp4';

function ManualPage() {
    const navigate = useNavigate();

    const homePage = () => {
        navigate(`/home`);
    };

    return (
        <div className="manualpage-wrapper">
            <div className="manualpage-header">
                <div className="layout" />
                <p>SMU로 매뉴얼</p>
                <div className="img-wrapper">
                    <img
                        src={Close}
                        alt="닫기"
                        onClick={homePage}
                        aria-hidden="true"
                    />
                </div>
            </div>
            <p className="main-info">
                SMU로는 상명대학교 서울캠퍼스 학생들의
                <br />
                등&#183;하교를 돕기 위한 애플리케이션입니다.
            </p>
            <div className="player-wrapper">
                <ReactPlayer
                    url={Movie}
                    width="100%"
                    controls
                    playing // 자동 재생 on
                    pip
                />
            </div>
            <div className="manualpage-content">
                <div className="function-info">
                    <h3>&#91;버스 정보 이용안내&#93;</h3>
                    <p className="bus-info1">
                        ‘버스정보조회’는 학교 버스 정류장을 경유하는 버스 노선의
                        특정 정류장 도착정보와 혼잡도를 제공합니다.
                        <br />
                        버스정보조회 페이지에서 상단의 아이콘을 누르면 버스의
                        종류를 변경할 수 있습니다.
                        <br />
                        또한 채팅방 리스트에서 버스 노선 별 오픈채팅방을 사용 할
                        수 있습니다.
                        <br />
                        버스 오픈채팅방에서는 버스 내부에 대한 정보 및 교통
                        상황(우회, 시위 등)에 대해 자유롭게 대화할 수 있습니다.
                        <br />
                    </p>
                    <h4>⚠ 주의</h4>
                    <p className="bus-info2">
                        마을버스에 해당하는 노선은 혼잡도를 제공하지 않습니다.
                        <br />
                    </p>
                    <h3>&#91;택시 합승 이용안내&#93;</h3>
                    <p className="taxi-info1">
                        ‘택시합승구하기’는 특정 역을 기준으로 택시 동승자를
                        구하는 서비스를 제공합니다.
                        <br />
                    </p>
                    <h4>1&#41; 예약</h4>
                    <p className="taxi-info2">
                        원하는 택시 합승 날짜와 장소를 선택하고 해당 옵션에
                        생성된 채팅방 중 원하는 시간을 선택하여 입장하면 택시
                        합승이 완료됩니다.
                        <br />
                        본인이 입장한 채팅방은 목록에서 빨간 테두리로 표시되고,
                        만약 미리 생성된 채팅방이 없다면 본인이 원하는 시간대와
                        합승 인원을 선택하여 채팅방을 생성하면 됩니다.
                        <br />
                        택시합승구하기 페이지에서 상단의 택시 아이콘을 누르거나,
                        ‘옵션변경!’이라고 써있는 수뭉이의 말풍선을 누르면 택시
                        합승 옵션을 변경할 수 있습니다.
                        <br />
                    </p>
                    <h4>⚠ 주의</h4>
                    <p className="taxi-info3">
                        택시 합승이 완료되는 것은 실제 택시를 승차하는 것이
                        아닙니다.
                        <br />
                        선택한 택시 탑승 장소 역시 실제 합승 장소가 아닙니다.
                        <br />
                        자세한 합승 장소는 생성된 채팅방을 통해 동승자와
                        정해주시기 바랍니다.
                        <br />
                        본인이 탑승 거부를 설정한 사용자가 포함된 채팅방에
                        입장하려고 한다면 채팅방 입장 전 주의 메시지가
                        표시됩니다.
                        <br />
                    </p>
                    <h4>2&#41; 채팅방</h4>
                    <p className="taxi-info4">
                        `` 채팅방은 탑승 시각 기준 전후 1시간 동안 하나만 입장
                        가능합니다.
                        <br />
                        채팅방에 입장하게 되면 닉네임은 학번으로 표시됩니다.
                        <br />
                        자신이 속한 채팅방 리스트는 메인 화면 왼쪽 상단 아이콘을
                        통해 확인 가능합니다.
                        <br />
                        채팅방에서 상단의 역 이름을 누르면 최대 인원수를 변경할
                        수 있습니다.
                        <br />
                        자세한 채팅방 이용 규칙은 금지 행위 항목을 참고하세요.
                        <br />
                    </p>
                    <h4>3&#41; 승차 거부</h4>
                    <p className="taxi-info5">
                        동승자 중 승차 거부를 설정하고 싶은 인원이 있다면 채팅방
                        왼쪽 하단의 승차 거부 아이콘을 통해 설정할 수 있습니다.
                        <br />
                        승차 거부는 현재 채팅방에 속한 인원과 나간 인원 모두
                        가능합니다.
                        <br />
                        자신이 승차 거부한 학우의 리스트는 내 정보의 택시 합승
                        거부 설정을 통해 확인 가능하며 승차 거부를 해제할 수도
                        있습니다.
                        <br />
                    </p>
                    <h3 className="community-header">
                        &#91;커뮤니티 이용안내&#93;
                    </h3>
                    <p className="community-info">
                        커뮤니티에서는 분실물에 대한 정보와 시위 정보를
                        제공합니다.
                        <br />
                        &#42;분실물 게시판에 글 작성 시 습득 장소 외에 분실물을
                        맡긴 장소도 적어주세요!
                        <br />
                    </p>
                    <h3 className="ban-header">&#91;금지 행위&#93;</h3>
                    <p className="ban-info">
                        채팅방, 글쓰기 및 댓글 작성 시 다음과 같은 행위
                        금지합니다.
                        <br />
                        <br />
                        1. 헌법에 위배되는 행위 금지
                        <br />
                        2. 국제 평화를 무너뜨릴 우려가 있는 행위 금지
                        <br />
                        3. 성적 도의 관념에 반하는 행위 금지
                        <br />
                        4. 폭력적인 행위 금지
                        <br />
                        5. 사회질서를 저해하는 행위 금지
                        <br />
                        6. 타인의 권리를 침해하는 행위 금지
                        <br />
                        <br />그 외에 도덕적으로 문제가 되거나 비윤리적인 모든
                        행위를 금합니다.
                        <br />
                        모두 건강하고 활기찬 SMU로를 위해 협조해 주시기
                        바랍니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ManualPage;
