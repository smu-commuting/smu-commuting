// User Action
export const USER_LOG_IN_REQUEST = 'USER_LOG_IN_REQUEST';
export const USER_LOG_IN_SUCCESS = 'USER_LOG_IN_SUCCESS';
export const USER_LOG_IN_FAILURE = 'USER_LOG_IN_FAILURE';
export const USER_SIGN_UP_REQUEST = 'USER_SIGN_UP_REQUEST';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAILURE = 'USER_SIGN_UP_FAILURE';

// 버스 번호 모달창 오픈
export const USER_BUS_MODAL = 'USER_BUS_MODAL';
export const USER_BUS_MODAL_SUCCESS = 'USER_BUS_MODAL_SUCCESS';
export const USER_BUS_MODAL_FAILURE = 'USER_BUS_MODAL_FAILURE';

// 택시 모달창 오픈
export const USER_TAXI_MODAL = 'USER_TAXI_MODAL';
export const USER_TAXI_MODAL_SUCCESS = 'USER_TAXI_MODAL_SUCCESS';
export const USER_TAXI_MODAL_FAILURE = 'USER_TAXI_MODAL_FAILURE';

// 커뮤니티 모달창 오픈
export const USER_COMMUNITY_MODAL = 'USER_COMMUNITY_MODAL';
export const USER_COMMUNITY_MODAL_SUCCESS = 'USER_COMMUNITY_MODAL_SUCCESS';
export const USER_COMMUNITY_MODAL_FAILURE = 'USER_COMMUNITY_MODAL_FAILURE';

// 버스 정보 모달창 오픈
export const BUS_INFO_MODAL_OPEN = 'BUS_INFO_MODAL_OPEN';
export const BUS_INFO_MODAL_OPEN_SUCCESS = 'BUS_INFO_MODAL_OPEN_SUCCESS';
export const BUS_INFO_MODAL_OPEN_FAILURE = 'BUS_INFO_MODAL_OPEN_FAILURE';

// 오픈데이터 요청
export const BUS_INFO_FETCH_REQUEST = 'BUS_INFO_FETCH_REQUEST';
export const BUS_INFO_FETCH_SUCCESS = 'BUS_INFO_FETCH_SUCCESS';
export const BUS_INFO_FETCH_FAILURE = 'BUS_INFO_FETCH_FAILURE';

// 자신이 속한 채팅 리스트 조회
export const TAXI_LIST_FETCH_REQUEST = 'TAXI_LIST_FETCH_REQUEST';
export const TAXI_LIST_FETCH_SUCCESS = 'TAXI_LIST_FETCH_SUCCESS';
export const TAXI_LIST_FETCH_FAILURE = 'TAXI_LIST_FETCH_FAILURE';

// 채팅방 나가기 확인 모달
export const TAXI_ROOM_DELETE_MODAL_REQUEST = 'TAXI_ROOM_DELETE_MODAL_REQUEST';
export const TAXI_ROOM_DELETE_MODAL_SUCCESS = 'TAXI_ROOM_DELETE_MODAL_SUCCESS';
export const TAXI_ROOM_DELETE_MODAL_FAILURE = 'TAXI_ROOM_DELETE_MODAL_FAILURE';

// 채팅방 나가기
export const TAXI_ROOM_DELETE_REQUEST = 'TAXI_ROOM_DELETE_REQUEST';
export const TAXI_ROOM_DELETE_SUCCESS = 'TAXI_ROOM_DELETE_SUCCESS';
export const TAXI_ROOM_DELETE_FAILURE = 'TAXI_ROOM_DELETE_FAILURE';

// 채팅방 기존 메세지 조회
export const CHAT_ROOM_MESSAGE_REQUEST = 'CHAT_ROOM_MESSAGE_REQUEST';
export const CHAT_ROOM_MESSAGE_SUCCESS = 'CHAT_ROOM_MESSAGE_SUCCESS';
export const CHAT_ROOM_MESSAGE_FAILURE = 'CHAT_ROOM_MESSAGE_FAILURE';

// 채팅방 스토어 삭제
export const CHAT_ROOM_DELETE_MESSAGE_REQUEST =
    'CHAT_ROOM_DELETE_MESSAGE_REQUEST';
export const CHAT_ROOM_DELETE_MESSAGE_SUCCESS =
    'CHAT_ROOM_DELETE_MESSAGE_SUCCESS';
export const CHAT_ROOM_DELETE_MESSAGE_FAILURE =
    'CHAT_ROOM_DELETE_MESSAGE_FAILURE';

// 택시 장소 리스트 조회
export const TAXI_PLACE_LIST_REQUEST = 'TAXI_PLACE_LIST_REQUEST';
export const TAXI_PLACE_LIST_SUCCESS = 'TAXI_PLACE_LIST_SUCCESS';
export const TAXI_PLACE_LIST_FAILURE = 'TAXI_PLACE_LIST_FAILURE';

// 택시 파티 리스트 조회
export const TAXI_PARTY_LIST_REQUEST = 'TAXI_PARTY_LIST_REQUEST';
export const TAXI_PARTY_LIST_SUCCESS = 'TAXI_PARTY_LIST_SUCCESS';
export const TAXI_PARTY_LIST_FAILURE = 'TAXI_PARTY_LIST_FAILURE';

// 택시방 생성 리스트 모달창 오픈
export const TAXI_CREATE_MODAL_REQUEST = 'TAXI_CREATE_MODAL_REQUEST';
export const TAXI_CREATE_MODAL_SUCCESS = 'TAXI_CREATE_MODAL_SUCCESS';
export const TAXI_CREATE_MODAL_FAILURE = 'TAXI_CREATE_MODAL_FAILURE';

// 현재 조회중인 택시 페이지 날짜
export const TAXI_PAGE_DATE_REQUEST = 'TAXI_PAGE_DATE_REQUEST';
export const TAXI_PAGE_DATE_SUCCESS = 'TAXI_PAGE_DATE_SUCCESS';
export const TAXI_PAGE_DATE_FAILURE = 'TAXI_PAGE_DATE_FAILURE';

// 택시 파티 생성
export const TAXI_PARTY_CREATE_REQUEST = 'TAXI_PARTY_CREATE_REQUEST';
export const TAXI_PARTY_CREATE_SUCCESS = 'TAXI_PARTY_CREATE_SUCCESS';
export const TAXI_PARTY_CREATE_FAILURE = 'TAXI_PARTY_CREATE_FAILURE';

// 택시 파티 리스트 종료된것 초기화 (무한스크롤 발동조건)
export const TAXI_PARTY_LIST_RESTART_REQUEST =
    'TAXI_PARTY_LIST_RESTART_REQUEST';
export const TAXI_PARTY_LIST_RESTART_SUCCESS =
    'TAXI_PARTY_LIST_RESTART_SUCCESS';
export const TAXI_PARTY_LIST_RESTART_FAILURE =
    'TAXI_PARTY_LIST_RESTART_FAILURE';

// 채팅방 입장 시도 모달
export const TAXI_TO_CHAT_INFO_MODAL_REQUEST =
    'TAXI_TO_CHAT_INFO_MODAL_REQUEST';
export const TAXI_TO_CHAT_INFO_MODAL_SUCCESS =
    'TAXI_TO_CHAT_INFO_MODAL_SUCCESS';
export const TAXI_TO_CHAT_INFO_MODAL_FAILURE =
    'TAXI_TO_CHAT_INFO_MODAL_FAILURE';

// 택시 파티 참여 액션
export const TAXI_PARTY_ENTER_REQUEST = 'TAXI_PARTY_ENTER_REQUEST';
export const TAXI_PARTY_ENTER_SUCCESS = 'TAXI_PARTY_ENTER_SUCCESS';
export const TAXI_PARTY_ENTER_FAILURE = 'TAXI_PARTY_ENTER_FAILURE';

// 택시 에러 모달 유저 확인 버튼 클릭
export const TAXI_SECOND_MODAL_CLICK_REQUEST =
    'TAXI_SECOND_MODAL_CLICK_REQUEST';
export const TAXI_SECOND_MODAL_CLICK_SUCCESS =
    'TAXI_SECOND_MODAL_CLICK_SUCCESS';
export const TAXI_SECOND_MODAL_CLICK_FAILRURE =
    'TAXI_SECOND_MODAL_CLICK_FAILRURE';

// 분실물 게시글 조회
export const COMMUNITY_GET_LOST_ITEM_LIST_REQUEST =
    'COMMUNITY_GET_LOST_ITEM_REQUEST';
export const COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS =
    'COMMUNITY_GET_LOST_ITEM_SUCCESS';
export const COMMUNITY_GET_LOST_ITEM_LIST_FAILURE =
    'COMMUNITY_GET_LOST_ITEM_FAILURE';

// 분실물 게시글 페이지 나갈때 리덕스 state 초기화
export const COMMUNITY_LIST_DELETE_REQUEST = 'COMMUNITY_LIST_DELETE_REQUEST';
export const COMMUNITY_LIST_DELETE_SUCCESS = 'COMMUNITY_LIST_DELETE_SUCCESS';
export const COMMUNITY_LIST_DELETE_FAILURE = 'COMMUNITY_LIST_DELETE_FAILURE';

// 분실물 단건 조회
export const COMMUNITY_GET_DETAIL_INFO_REQUEST =
    'COMMUNITY_GET_DETAIL_INFO_REQUEST';
export const COMMUNITY_GET_DETAIL_INFO_SUCCESS =
    'COMMUNITY_GET_DETAIL_INFO_SUCCESS';
export const COMMUNITY_GET_DETAIL_INFO_FAILURE =
    'COMMUNITY_GET_DETAIL_INFO_FAILURE';

// 상세페이지 수정/삭제 모달 클릭
export const COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST =
    'COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST';
export const COMMUNITY_CLICK_DETAIL_UD_MODAL_SUCCESS =
    'COMMUNITY_CLICK_DETAIL_UD_MODAL_SUCCESS';
export const COMMUNITY_CLICK_DETAIL_UD_MODAL_FAILURE =
    'COMMUNITY_CLICK_DETAIL_UD_MODAL_FAILURE';

// 상세페이지 삭제 확인 모달
export const COMMUNITY_DELETE_CONFIRM_MODAL_REQUEST =
    'COMMUNITY_DELETE_CONFIRM_MODAL_REQUEST';
export const COMMUNITY_DELETE_CONFIRM_MODAL_SUCCESS =
    'COMMUNITY_DELETE_CONFIRM_MODAL_SUCCESS';
export const COMMUNITY_DELETE_CONFIRM_MODAL_FAILURE =
    'COMMUNITY_DELETE_CONFIRM_MODAL_FAILURE';

// 분실물 상세페이지 게시물 삭제
export const COMMINITY_DETAIL_PAGE_DELETE_REQUEST =
    'COMMINITY_DETAIL_PAGE_DELETE_REQUEST';
export const COMMINITY_DETAIL_PAGE_DELETE_SUCCESS =
    'COMMINITY_DETAIL_PAGE_DELETE_SUCCESS';
export const COMMINITY_DETAIL_PAGE_DELETE_FAILURE =
    'COMMINITY_DETAIL_PAGE_DELETE_FAILURE';
