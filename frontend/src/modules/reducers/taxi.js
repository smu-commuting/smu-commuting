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
    TAXI_PARTY_CREATE_REQUEST,
    TAXI_PARTY_CREATE_SUCCESS,
    TAXI_PARTY_CREATE_FAILURE,
} from '../../constants';

export const initialState = {
    // 채팅 리스트
    myTaxiParties: null,
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
    // 택시 생성 모달창 오픈
    isTaxiCreateModalOpen: false,
    // 채팅방 삭제
    deleteTaxiPartyLoading: false,
    deleteTaxiPartyDone: false,
    deleteTaxiPartyError: null,
};

export const getMyTaxiParties = () => {
    return {
        type: TAXI_LIST_FETCH_REQUEST,
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

export const taxiCreateModalClick = () => {
    return {
        type: TAXI_PARTY_CREATE_REQUEST,
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
                console.log(action.data.data);
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
                break;
            case TAXI_PARTY_LIST_FAILURE:
                draft.taxiPartyListLoading = false;
                draft.taxiPartyListError = action.err;
                break;
            case TAXI_PARTY_CREATE_REQUEST:
                break;
            case TAXI_PARTY_CREATE_SUCCESS:
                draft.isTaxiCreateModalOpen = !draft.isTaxiCreateModalOpen;
                break;
            case TAXI_PARTY_CREATE_FAILURE:
                draft.isTaxiCreateModalOpen = false;
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
                break;
            case TAXI_ROOM_DELETE_FAILURE:
                console.log(action.err);
                draft.deleteTaxiPartyLoading = false;
                draft.deleteTaxiPartyError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
