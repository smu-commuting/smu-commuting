import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';

// saga에서 사용중인 api 요청 기본 url이 적용된다.
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
// 서로 다른 도메인간 쿠키 전달 허용
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        // fork(postSaga),
    ]);
}
