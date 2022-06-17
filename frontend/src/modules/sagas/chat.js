import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    CHAT_ROOM_MESSAGE_REQUEST,
    CHAT_ROOM_MESSAGE_SUCCESS,
    CHAT_ROOM_MESSAGE_FAILURE,
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

function* watchChatRoomMessage() {
    yield takeLatest(CHAT_ROOM_MESSAGE_REQUEST, chatMessageList);
}

export default function* chatSaga() {
    yield all([fork(watchChatRoomMessage)]);
}
