/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    CHAT_LIST_FETCH_REQUEST,
    CHAT_LIST_FETCH_SUCCESS,
    CHAT_LIST_FETCH_FAILURE,
    CHAT_ROOM_DELETE_REQUEST,
    CHAT_ROOM_DELETE_SUCCESS,
    CHAT_ROOM_DELETE_FAILURE,
} from '../../constants';

export const initialState = {
    myChatRooms: null,
    // 채팅 리스트 로딩
    chatListLoading: false,
    chatListDone: false,
    chatListError: null,
    deleteChatRoomLoading: false,
    deleteChatRoomDone: false,
    deleteChatRoomError: null,
};

export const getMyChatRooms = () => {
    return {
        type: CHAT_LIST_FETCH_REQUEST,
    };
};

export const deleteMyChatRoom = id => {
    return {
        type: CHAT_ROOM_DELETE_REQUEST,
        id,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case CHAT_LIST_FETCH_REQUEST:
                draft.chatListLoading = true;
                draft.chatListDone = false;
                draft.chatListError = null;
                break;
            case CHAT_LIST_FETCH_SUCCESS:
                draft.chatListLoading = false;
                draft.chatListDone = true;
                draft.chatListError = null;
                draft.myChatRooms = action.data.data;
                console.log(draft.myChatRooms);
                break;
            case CHAT_LIST_FETCH_FAILURE:
                draft.chatListLoading = false;
                draft.chatListError = action.err;
                break;
            case CHAT_ROOM_DELETE_REQUEST:
                draft.deleteChatRoomLoading = true;
                draft.deleteChatRoomDone = false;
                draft.deleteChatRoomError = null;
                break;
            case CHAT_ROOM_DELETE_SUCCESS:
                draft.deleteChatRoomLoading = false;
                draft.deleteChatRoomDone = true;
                draft.deleteChatRoomError = null;
                break;
            case CHAT_ROOM_DELETE_FAILURE:
                draft.deleteChatRoomLoading = false;
                draft.deleteChatRoomError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
