import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';

const persistConfig = {
    key: 'root',
    // localStorage에 저장합니다.
    storage,
    // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user,
});

export default persistReducer(persistConfig, rootReducer);
