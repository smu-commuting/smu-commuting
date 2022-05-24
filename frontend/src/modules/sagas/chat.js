import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    CHAT_LIST_FETCH_REQUEST,
    CHAT_LIST_FETCH_SUCCESS,
    CHAT_LIST_FETCH_FAILURE,
    CHAT_ROOM_DELETE_REQUEST,
    CHAT_ROOM_DELETE_SUCCESS,
    CHAT_ROOM_DELETE_FAILURE,
} from '../../constants';
import { deleteChatRoomApi, getChattingApi } from '../../utils';

function* chatlist() {
    const result = yield call(getChattingApi);
    console.log('요청 이후 result', result);
    try {
        yield put({
            type: CHAT_LIST_FETCH_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_LIST_FETCH_FAILURE,
            error: err,
        });
    }
}

function* deleteChatRoom(action) {
    console.log('saga', action);
    const result = yield call(deleteChatRoomApi, action.id);
    console.log('요청 이후 result', result);
    try {
        yield put({
            type: CHAT_ROOM_DELETE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_DELETE_FAILURE,
            error: err,
        });
    }
}

function* watchChatList() {
    yield takeLatest(CHAT_LIST_FETCH_REQUEST, chatlist);
}

function* watchDeleteChatRoom() {
    yield takeLatest(CHAT_ROOM_DELETE_REQUEST, deleteChatRoom);
}

export default function* chatSaga() {
    yield all([fork(watchChatList), fork(watchDeleteChatRoom)]);
}