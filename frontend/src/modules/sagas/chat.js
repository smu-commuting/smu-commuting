import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    CHAT_LIST_FETCH_REQUEST,
    CHAT_LIST_FETCH_SUCCESS,
    CHAT_LIST_FETCH_FAILURE,
} from '../../constants';
import { getChattingApi } from '../../utils';

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

function* watchChatList() {
    yield takeLatest(CHAT_LIST_FETCH_REQUEST, chatlist);
}

export default function* chatSaga() {
    yield all([fork(watchChatList)]);
}
