import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    USER_LOG_IN_REQUEST,
    USER_LOG_IN_SUCCESS,
    USER_LOG_IN_FAILURE,
    USER_SIGN_UP_REQUEST,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_BUS_MODAL,
    USER_BUS_MODAL_SUCCESS,
    USER_BUS_MODAL_FAILURE,
} from '../../constants';
import { signupApi } from '../../utils';

function* login(action) {
    console.log('saga In action', action);
    try {
        yield put({
            type: USER_LOG_IN_SUCCESS,
            data: action,
        });
    } catch (err) {
        yield put({
            type: USER_LOG_IN_FAILURE,
            err,
        });
    }
}

// function signupAPI(data) {
//     return axios.post(`/api/user/signup`, JSON.stringify(data), {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             'Content-Type': `application/json`,
//         },
//     });
// }
// dispatch할 때 넘겨준 data === action

function* signup(action) {
    try {
        yield call(signupApi, action.data);
        yield put({
            type: USER_SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: USER_SIGN_UP_FAILURE,
            error: err,
        });
    }
}

function* busmodal() {
    try {
        yield put({
            type: USER_BUS_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_BUS_MODAL_FAILURE,
            error: err,
        });
    }
}

// function logoutAPI() {
//     return axios.post('user/logout');
// }

// function* logout() {
//     try {
//         yield call(logoutAPI);
//         yield put({
//             type: LOG_OUT_SUCCESS,
//             // data: result.data
//         });
//     } catch (err) {
//         yield put({
//             type: LOG_OUT_FAILURE,
//             error: err.response.data,
//         });
//     }
// }

// function* watchLogout() {
//     yield takeLatest(LOG_OUT_REQUEST, logout);
// }

function* watchLogin() {
    yield takeLatest(USER_LOG_IN_REQUEST, login);
}

function* watchSignUp() {
    yield takeLatest(USER_SIGN_UP_REQUEST, signup);
}

function* watchBusModal() {
    yield takeLatest(USER_BUS_MODAL, busmodal);
}

export default function* userSaga() {
    yield all([fork(watchLogin), fork(watchSignUp), fork(watchBusModal)]);
}
