import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import busSaga from './bus';
import taxiSaga from './taxi';
import chatSaga from './chat';
import communitySaga from './community';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(busSaga),
        fork(taxiSaga),
        fork(chatSaga),
        fork(communitySaga),
    ]);
}
