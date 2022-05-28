/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    CHAT_ROOM_MESSAGE_REQUEST,
    CHAT_ROOM_MESSAGE_SUCCESS,
    CHAT_ROOM_MESSAGE_FAILURE,
} from '../../constants';

export const initialState = {
    chatMessageList: [],
    chatLoadEnd: false,
    // hasMoreChat: true,
    chatMessageListLoading: false,
    chatMessageListDone: false,
    chatMessageListError: null,
};

export const getChatMessageList = data => {
    return {
        type: CHAT_ROOM_MESSAGE_REQUEST,
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
                draft.chatMessageList = draft.chatMessageList.concat(
                    action.data.data,
                );
                draft.chatLoadEnd = action.data.data.length === 0;
                // draft.hasMoreChat = action.data.data.length !== 0;
                console.log('success', action.data.data);
                console.log('draft', draft.chatMessageList);
                break;
            case CHAT_ROOM_MESSAGE_FAILURE:
                draft.chatMessageListLoading = false;
                draft.chatMessageListError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
