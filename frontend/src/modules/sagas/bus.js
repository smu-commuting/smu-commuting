/* eslint-disable no-unused-vars */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    BUS_INFO_MODAL_OPEN,
    BUS_INFO_MODAL_OPEN_SUCCESS,
    BUS_INFO_MODAL_OPEN_FAILURE,
    BUS_INFO_FETCH_REQUEST,
    BUS_INFO_FETCH_SUCCESS,
    BUS_INFO_FETCH_FAILURE,
} from '../../constants';
import { busApi } from '../../utils';

function* businfomodal(action) {
    console.log(action.data);
    try {
        yield put({
            type: BUS_INFO_MODAL_OPEN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: BUS_INFO_MODAL_OPEN_FAILURE,
            error: err,
        });
    }
}

function* businfofetch(action) {
    console.log('action', action.data);
    try {
        const result = yield call(busApi, action.data);
        yield put({
            type: BUS_INFO_FETCH_SUCCESS,
            data:
                action.data === '100100447'
                    ? result.data.msgBody.itemList.slice(0, 55)
                    : result.data.msgBody.itemList,
        });
    } catch (err) {
        yield put({
            type: BUS_INFO_FETCH_FAILURE,
            error: err,
        });
    }
}

function* watchBusInfoModal() {
    yield takeLatest(BUS_INFO_MODAL_OPEN, businfomodal);
}

function* watchBusInfoFetch() {
    yield takeLatest(BUS_INFO_FETCH_REQUEST, businfofetch);
}

export default function* userSaga() {
    yield all([fork(watchBusInfoModal), fork(watchBusInfoFetch)]);
}
