import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    CHAT_ROOM_MESSAGE_REQUEST,
    CHAT_ROOM_MESSAGE_SUCCESS,
    CHAT_ROOM_MESSAGE_FAILURE,
    CHAT_ROOM_DELETE_MESSAGE_REQUEST,
    CHAT_ROOM_DELETE_MESSAGE_SUCCESS,
    CHAT_ROOM_DELETE_MESSAGE_FAILURE,
} from '../../constants';
import { getRoomMessage } from '../../utils';

function* chatMessageList(action) {
    try {
        const result = yield call(getRoomMessage, action.data);
        console.log('채팅 요청 이후 result', result);
        yield put({
            type: CHAT_ROOM_MESSAGE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_MESSAGE_FAILURE,
            error: err,
        });
    }
}

function* deleteChatMessageList() {
    try {
        yield put({
            type: CHAT_ROOM_DELETE_MESSAGE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_DELETE_MESSAGE_FAILURE,
            error: '채팅방 삭제 실패',
        });
    }
}

function* watchChatRoomMessage() {
    yield takeLatest(CHAT_ROOM_MESSAGE_REQUEST, chatMessageList);
}

function* watchDeleteChatRoomMessage() {
    yield takeLatest(CHAT_ROOM_DELETE_MESSAGE_REQUEST, deleteChatMessageList);
}

export default function* chatSaga() {
    yield all([fork(watchChatRoomMessage)]);
    yield all([fork(watchDeleteChatRoomMessage)]);
}
