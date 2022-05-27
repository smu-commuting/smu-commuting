import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import busSaga from './bus';
import taxiSaga from './taxi';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(busSaga), fork(taxiSaga)]);
}
