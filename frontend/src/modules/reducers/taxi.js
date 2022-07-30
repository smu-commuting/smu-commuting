/* eslint-disable no-duplicate-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    TAXI_LIST_FETCH_REQUEST,
    TAXI_LIST_FETCH_SUCCESS,
    TAXI_LIST_FETCH_FAILURE,
    TAXI_ROOM_DELETE_REQUEST,
    TAXI_ROOM_DELETE_SUCCESS,
    TAXI_ROOM_DELETE_FAILURE,
    TAXI_PLACE_LIST_REQUEST,
    TAXI_PLACE_LIST_SUCCESS,
    TAXI_PLACE_LIST_FAILURE,
    TAXI_PARTY_LIST_REQUEST,
    TAXI_PARTY_LIST_SUCCESS,
    TAXI_PARTY_LIST_FAILURE,
    TAXI_CREATE_MODAL_REQUEST,
    TAXI_CREATE_MODAL_SUCCESS,
    TAXI_CREATE_MODAL_FAILURE,
    TAXI_PAGE_DATE_REQUEST,
    TAXI_PAGE_DATE_SUCCESS,
    TAXI_PAGE_DATE_FAILURE,
    TAXI_PARTY_CREATE_REQUEST,
    TAXI_PARTY_CREATE_SUCCESS,
    TAXI_PARTY_CREATE_FAILURE,
    TAXI_PARTY_LIST_RESTART_REQUEST,
    TAXI_PARTY_LIST_RESTART_SUCCESS,
    TAXI_PARTY_LIST_RESTART_FAILURE,
    TAXI_TO_CHAT_INFO_MODAL_REQUEST,
    TAXI_TO_CHAT_INFO_MODAL_SUCCESS,
    TAXI_TO_CHAT_INFO_MODAL_FAILURE,
    TAXI_PARTY_ENTER_REQUEST,
    TAXI_PARTY_ENTER_SUCCESS,
    TAXI_PARTY_ENTER_FAILURE,
    TAXI_SECOND_MODAL_CLICK_REQUEST,
    TAXI_SECOND_MODAL_CLICK_SUCCESS,
    TAXI_SECOND_MODAL_CLICK_FAILRURE,
    TAXI_ROOM_DELETE_MODAL_REQUEST,
    TAXI_ROOM_DELETE_MODAL_SUCCESS,
    TAXI_ROOM_DELETE_MODAL_FAILURE,
    TAXI_PARTY_LIST_DELETE_REQUEST,
    TAXI_PARTY_LIST_DELETE_SUCCESS,
    TAXI_PARTY_LIST_DELETE_FAILURE,
    TAXI_LIST_TO_CHAT_INFO_REQUEST,
    TAXI_LIST_TO_CHAT_INFO_SUCCESS,
    TAXI_LIST_TO_CHAT_INFO_FAILURE,
    CHAT_ROOM_CHANGE_MAXIMUM_REQUEST,
    CHAT_ROOM_CHANGE_MAXIMUM_SUCCESS,
    CHAT_ROOM_CHANGE_MAXIMUM_FAILURE,
    TAXI_TO_CHAT_INFO_MODAL_CLOSE_REQUEST,
    TAXI_TO_CHAT_INFO_MODAL_CLOSE_SUCCESS,
    TAXI_TO_CHAT_INFO_MODAL_CLOSE_FAILURE,
} from '../../constants';

export const initialState = {
    // 채팅 리스트
    myTaxiParties: [],
    myTaxiPartiesLoading: false,
    myTaxiPartiesDone: false,
    myTaxiPartiesError: null,
    // 택시 미팅 장소
    taxiMeetPlaceList: null,
    taxiMeetPlaceListLoading: false,
    taxiMeetPlaceListDone: false,
    taxiMeetPlaceListError: null,
    // 택시 파티 리스트 조회
    taxiPartyList: [],
    taxiPartyListLoading: false,
    taxiPartyListDone: false,
    taxiPartyListError: null,
    taxiPartyEnd: false,
    // 택시 파티 참여
    isTaxiPartyEnterError: null,
    // 현재 조회중인 택시 페이지 정보(택시 무한 스크롤에 따른 when/placeId/placeName)
    taxiPageInfo: null,
    // 택시 생성 모달창 오픈
    isTaxiCreateModalOpen: false,
    // 채팅방 삭제
    deleteTaxiPartyLoading: false,
    deleteTaxiPartyDone: false,
    deleteTaxiPartyError: null,
    // 삭제 모달에 뜰 정보
    isDeleteTaxiPartyModal: false,
    isDeleteAllowModal: false,
    // 택시 파티 생성
    createTaxiPartyLoading: false,
    createTaxiPartyDone: false,
    createTaxiPartyError: null,
    showCreateErrorModal: false,
    // 채팅방 입장 알림 모달창
    isEnterChattingRoomModalOpen: false,
    // 알림 모달창에 뜨게 될 정보들, 채팅방 정보
    chattingRoomInfo: null,
    // 입장 에러창 뜨게할까요
    showErrorModal: false,
};

export const getMyTaxiParties = () => {
    return {
        type: TAXI_LIST_FETCH_REQUEST,
    };
};

export const deleteModal = data => {
    return {
        type: TAXI_ROOM_DELETE_MODAL_REQUEST,
        data,
    };
};

export const deleteTaxiParty = id => {
    return {
        type: TAXI_ROOM_DELETE_REQUEST,
        id,
    };
};

export const getTaxiMeetPlaceList = () => {
    return {
        type: TAXI_PLACE_LIST_REQUEST,
    };
};

export const getTaxiPartyList = data => {
    return {
        type: TAXI_PARTY_LIST_REQUEST,
        data,
    };
};

export const taxiPageInfo = data => {
    return {
        type: TAXI_PAGE_DATE_REQUEST,
        data,
    };
};

export const taxiCreateModalClick = () => {
    return {
        type: TAXI_CREATE_MODAL_REQUEST,
    };
};

export const taxiPartyCreate = data => {
    console.log('액션함수 진입', data);
    return {
        type: TAXI_PARTY_CREATE_REQUEST,
        data,
    };
};

export const taxiPartyListRestart = () => {
    return {
        type: TAXI_PARTY_LIST_RESTART_REQUEST,
    };
};

export const taxiToChatModal = id => {
    return {
        type: TAXI_TO_CHAT_INFO_MODAL_REQUEST,
        id,
    };
};

export const taxiPartyEnter = errorMessage => {
    return {
        type: TAXI_PARTY_ENTER_REQUEST,
        errorMessage,
    };
};

export const taxiSecondModalClose = () => {
    return {
        type: TAXI_SECOND_MODAL_CLICK_REQUEST,
    };
};

export const taxiPartyListDelete = () => {
    return {
        type: TAXI_PARTY_LIST_DELETE_REQUEST,
    };
};

export const taxiToChatModalClose = () => {
    return {
        type: TAXI_TO_CHAT_INFO_MODAL_CLOSE_REQUEST,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case TAXI_LIST_FETCH_REQUEST:
                draft.myTaxiPartiesLoading = true;
                draft.myTaxiPartiesDone = false;
                draft.myTaxiPartiesError = null;
                break;
            case TAXI_LIST_FETCH_SUCCESS:
                draft.myTaxiPartiesLoading = false;
                draft.myTaxiPartiesDone = true;
                draft.myTaxiPartiesError = null;
                draft.myTaxiParties = action.data.data;
                break;
            case TAXI_LIST_FETCH_FAILURE:
                draft.myTaxiPartiesLoading = false;
                draft.myTaxiPartiesError = action.err;
                break;
            case TAXI_PLACE_LIST_REQUEST:
                draft.taxiMeetPlaceListLoading = true;
                draft.taxiMeetPlaceListDone = false;
                draft.taxiMeetPlaceListError = null;
                break;
            case TAXI_PLACE_LIST_SUCCESS:
                draft.taxiMeetPlaceListLoading = false;
                draft.taxiMeetPlaceListDone = true;
                draft.taxiMeetPlaceListError = null;
                draft.taxiMeetPlaceList = action.data.data;
                break;
            case TAXI_PLACE_LIST_FAILURE:
                draft.taxiMeetPlaceListLoading = false;
                draft.taxiMeetPlaceListError = action.err;
                break;
            case TAXI_PARTY_LIST_REQUEST:
                draft.taxiPartyListLoading = true;
                draft.taxiPartyListDone = false;
                draft.taxiPartyListError = null;
                break;
            case TAXI_PARTY_LIST_SUCCESS:
                draft.taxiPartyListLoading = false;
                draft.taxiPartyListDone = true;
                draft.taxiPartyListError = null;
                console.log(action.data.data);
                draft.taxiPartyList = action.data.data;
                draft.taxiPartyEnd = action.data.data.length !== 10; // 요청 사이즈 바꾸면 이것도 반드시 바꿔야 할 것
                break;
            case TAXI_PARTY_LIST_FAILURE:
                draft.taxiPartyListLoading = false;
                draft.taxiPartyListError = action.err;
                break;
            case TAXI_PARTY_LIST_DELETE_REQUEST:
                break;
            case TAXI_PARTY_LIST_DELETE_SUCCESS:
                draft.taxiPartyList = [];
                break;
            case TAXI_PARTY_LIST_DELETE_FAILURE:
                break;
            case TAXI_CREATE_MODAL_REQUEST:
                break;
            case TAXI_CREATE_MODAL_SUCCESS:
                draft.isTaxiCreateModalOpen = !draft.isTaxiCreateModalOpen;
                break;
            case TAXI_CREATE_MODAL_FAILURE:
                draft.isTaxiCreateModalOpen = false;
                break;
            case TAXI_PAGE_DATE_REQUEST:
                break;
            case TAXI_PAGE_DATE_SUCCESS:
                draft.taxiPageInfo = action.data;
                break;
            case TAXI_PAGE_DATE_FAILURE:
                break;

            case TAXI_PARTY_CREATE_REQUEST:
                draft.createTaxiPartyLoading = true;
                draft.createTaxiPartyDone = false;
                draft.createTaxiPartyError = null;
                break;
            case TAXI_PARTY_CREATE_SUCCESS:
                draft.createTaxiPartyLoading = false;
                draft.createTaxiPartyDone = true;
                draft.createTaxiPartyError = null;
                break;
            case TAXI_PARTY_CREATE_FAILURE:
                draft.createTaxiPartyLoading = false;
                draft.createTaxiPartyError = action.error;
                draft.showCreateErrorModal = true;
                break;
            case TAXI_PARTY_ENTER_REQUEST:
                break;
            case TAXI_PARTY_ENTER_SUCCESS:
                draft.isEnterChattingRoomModalOpen = false;
                draft.isTaxiPartyEnterError = action.data && action.data;
                draft.showErrorModal = action.data !== undefined;
                console.log('reducer', action.data);
                break;
            case TAXI_PARTY_ENTER_FAILURE:
                break;

            case TAXI_SECOND_MODAL_CLICK_REQUEST:
                break;
            case TAXI_SECOND_MODAL_CLICK_SUCCESS: // 2번째 확인 모달 종료 조건
                draft.showErrorModal = false;
                draft.showCreateErrorModal = false;
                draft.isDeleteAllowModal = false;
                break;
            case TAXI_SECOND_MODAL_CLICK_FAILRURE:
                break;
            case TAXI_PARTY_LIST_RESTART_REQUEST:
                break;
            case TAXI_PARTY_LIST_RESTART_SUCCESS:
                draft.taxiPartyEnd = false;
                break;
            case TAXI_PARTY_LIST_RESTART_FAILURE:
                break;

            case TAXI_TO_CHAT_INFO_MODAL_REQUEST:
                break;
            case TAXI_TO_CHAT_INFO_MODAL_SUCCESS:
                draft.isEnterChattingRoomModalOpen =
                    !draft.isEnterChattingRoomModalOpen;
                draft.chattingRoomInfo = action.data;
                console.log('chattingRoomInfo', action.data);
                break;
            case TAXI_TO_CHAT_INFO_MODAL_FAILURE:
                break;
            case TAXI_TO_CHAT_INFO_MODAL_CLOSE_REQUEST:
                break;
            case TAXI_TO_CHAT_INFO_MODAL_CLOSE_SUCCESS:
                draft.isEnterChattingRoomModalOpen =
                    !draft.isEnterChattingRoomModalOpen;
                break;
            case TAXI_TO_CHAT_INFO_MODAL_CLOSE_FAILURE:
                break;
            case TAXI_ROOM_DELETE_MODAL_REQUEST:
                break;
            case TAXI_ROOM_DELETE_MODAL_SUCCESS:
                draft.isDeleteTaxiPartyModal = !draft.isDeleteTaxiPartyModal;
                break;
            case TAXI_ROOM_DELETE_MODAL_FAILURE:
                break;
            case TAXI_ROOM_DELETE_REQUEST:
                draft.deleteTaxiPartyLoading = true;
                draft.deleteTaxiPartyDone = false;
                draft.deleteTaxiPartyError = null;
                break;
            case TAXI_ROOM_DELETE_SUCCESS:
                draft.deleteTaxiPartyLoading = false;
                draft.deleteTaxiPartyDone = true;
                draft.deleteTaxiPartyError = null;
                draft.isDeleteTaxiPartyModal = !draft.isDeleteTaxiPartyModal;
                draft.isDeleteAllowModal = !draft.isDeleteAllowModal;
                break;
            case TAXI_ROOM_DELETE_FAILURE:
                draft.deleteTaxiPartyLoading = false;
                draft.deleteTaxiPartyError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
