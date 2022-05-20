/* eslint-disable no-unused-vars */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    BUS_INFO_MODAL_OPEN,
    BUS_INFO_MODAL_OPEN_SUCCESS,
    BUS_INFO_MODAL_OPEN_FAILURE,
    BUS_INFO_MODAL_FETCH_REQUEST,
    BUS_INFO_MODAL_FETCH_SUCCESS,
    BUS_INFO_MODAL_FETCH_FAILURE,
} from '../../constants';

function* businfomodal() {
    try {
        yield put({
            type: BUS_INFO_MODAL_OPEN_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: BUS_INFO_MODAL_OPEN_FAILURE,
            error: err,
        });
    }
}

function* watchBusInfoModal() {
    yield takeLatest(BUS_INFO_MODAL_OPEN, businfomodal);
}

export default function* userSaga() {
    yield all([fork(watchBusInfoModal)]);
}
