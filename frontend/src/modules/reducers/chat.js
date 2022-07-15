/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    CHAT_ROOM_MESSAGE_REQUEST,
    CHAT_ROOM_MESSAGE_SUCCESS,
    CHAT_ROOM_MESSAGE_FAILURE,
    CHAT_ROOM_DELETE_MESSAGE_REQUEST,
    CHAT_ROOM_DELETE_MESSAGE_SUCCESS,
    CHAT_ROOM_DELETE_MESSAGE_FAILURE,
    CHAT_ROOM_PEOPLE_LIST_MODAL_REQUEST,
    CHAT_ROOM_PEOPLE_LIST_MODAL_SUCCESS,
    CHAT_ROOM_PEOPLE_LIST_MODAL_FAILURE,
    CHAT_ROOM_GET_PEOPLE_LIST_REQUEST,
    CHAT_ROOM_GET_PEOPLE_LIST_SUCCESS,
    CHAT_ROOM_GET_PEOPLE_LIST_FAILURE,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_REQUEST,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_SUCCESS,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_FAILURE,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_REQUEST,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_SUCCESS,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_FAILURE,
    CHAT_ROOM_CHANGE_MAXIMUM_REQUEST,
    CHAT_ROOM_CHANGE_MAXIMUM_SUCCESS,
    CHAT_ROOM_CHANGE_MAXIMUM_FAILURE,
} from '../../constants';

export const initialState = {
    chatMessageList: [],
    chatLoadEnd: false,
    chatMessageListLoading: false,
    chatMessageListDone: false,
    chatMessageListError: null,
    // 거부 모달 클릭
    chatRoomPeopleModal: false,
    // 현재 방에 있는 사람
    getPeopleList: [],
    getPeopleListLoading: false,
    getPeopleListDone: false,
    getPeopleListError: null,
    // 방을 나간 사람
    getOutPeopleList: [],
    getOutPeopleListLoading: false,
    getOutPeopleListDone: false,
    getOutPeopleListError: null,

    // 채팅방 인원 변경 모달 클릭
    changeMaximumModal: false,

    // 채팅방 인원수 변경
    changeMaximumLoading: false,
    changeMaximumDone: false,
    changeMaximumError: null,
};

export const getChatMessageList = data => {
    return {
        type: CHAT_ROOM_MESSAGE_REQUEST,
        data,
    };
};

export const deleteChatMessageList = () => {
    return {
        type: CHAT_ROOM_DELETE_MESSAGE_REQUEST,
    };
};

export const denialModalClick = () => {
    return {
        type: CHAT_ROOM_PEOPLE_LIST_MODAL_REQUEST,
    };
};

export const getPeopleListRequest = id => {
    return {
        type: CHAT_ROOM_GET_PEOPLE_LIST_REQUEST,
        id,
    };
};

export const getOutPeopleListRequest = id => {
    return {
        type: CHAT_ROOM_GET_OUT_PEOPLE_LIST_REQUEST,
        id,
    };
};

export const changeMaximumModalClick = () => {
    return {
        type: CHAT_ROOM_CHANGE_MAXIMUM_MODAL_REQUEST,
    };
};

export const changeMaximum = data => {
    return {
        type: CHAT_ROOM_CHANGE_MAXIMUM_REQUEST,
        data,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case CHAT_ROOM_MESSAGE_REQUEST:
                draft.chatMessageListLoading = true;
                draft.chatMessageListDone = false;
                draft.chatMessageListError = null;
                break;
            case CHAT_ROOM_MESSAGE_SUCCESS:
                draft.chatMessageListLoading = false;
                draft.chatMessageListDone = true;
                draft.chatMessageListError = null;
                draft.chatMessageList = action.data.data;
                draft.chatLoadEnd = action.data.data.length === 0;
                // console.log('success', action.data.data);
                // console.log('draft', draft.chatMessageList);
                break;
            case CHAT_ROOM_MESSAGE_FAILURE:
                draft.chatMessageListLoading = false;
                draft.chatMessageListError = action.err;
                break;
            case CHAT_ROOM_DELETE_MESSAGE_REQUEST:
                break;
            case CHAT_ROOM_DELETE_MESSAGE_SUCCESS:
                draft.chatMessageList = [];
                break;
            case CHAT_ROOM_DELETE_MESSAGE_FAILURE:
                break;
            case CHAT_ROOM_PEOPLE_LIST_MODAL_REQUEST:
                break;
            case CHAT_ROOM_PEOPLE_LIST_MODAL_SUCCESS:
                draft.chatRoomPeopleModal = !draft.chatRoomPeopleModal;
                break;
            case CHAT_ROOM_PEOPLE_LIST_MODAL_FAILURE:
                break;
            case CHAT_ROOM_GET_PEOPLE_LIST_REQUEST:
                draft.getPeopleListLoading = true;
                draft.getPeopleListDone = false;
                break;
            case CHAT_ROOM_GET_PEOPLE_LIST_SUCCESS:
                draft.getPeopleListLoading = false;
                draft.getPeopleListDone = true;
                draft.getPeopleList = action.data;
                break;
            case CHAT_ROOM_GET_PEOPLE_LIST_FAILURE:
                draft.getPeopleListLoading = false;
                draft.getPeopleListError = action.err;
                break;
            case CHAT_ROOM_GET_OUT_PEOPLE_LIST_REQUEST:
                draft.getOutPeopleListLoading = true;
                draft.getOutPeopleListDone = false;
                break;
            case CHAT_ROOM_GET_OUT_PEOPLE_LIST_SUCCESS:
                draft.getOutPeopleListLoading = false;
                draft.getOutPeopleListDone = true;
                draft.getOutPeopleList = action.data;
                break;
            case CHAT_ROOM_GET_OUT_PEOPLE_LIST_FAILURE:
                draft.getOutPeopleListLoading = false;
                draft.getOutPeopleListError = action.err;
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_MODAL_REQUEST:
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_MODAL_SUCCESS:
                draft.changeMaximumModal = !draft.changeMaximumModal;
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_MODAL_FAILURE:
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_REQUEST:
                draft.changeMaximumLoading = true;
                draft.changeMaximumDone = false;
                draft.changeMaximumError = null;
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_SUCCESS:
                draft.changeMaximumLoading = false;
                draft.changeMaximumDone = true;
                draft.changeMaximumModal = false;
                break;
            case CHAT_ROOM_CHANGE_MAXIMUM_FAILURE:
                draft.changeMaximumLoading = false;
                draft.changeMaximumError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;
