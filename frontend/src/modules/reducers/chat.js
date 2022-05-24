/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    CHAT_LIST_FETCH_REQUEST,
    CHAT_LIST_FETCH_SUCCESS,
    CHAT_LIST_FETCH_FAILURE,
} from '../../constants';

export const initialState = {
    myChatRooms: null,
    // 채팅 리스트 로딩
    chatListLoading: false,
    chatListDone: false,
    chatListError: null,
};

export const getMyChatRooms = () => {
    return {
        type: CHAT_LIST_FETCH_REQUEST,
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
            default:
                break;
        }
    });
};

export default reducer;
