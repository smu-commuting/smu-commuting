/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import bus from './bus';
import chat from './chat';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'bus', 'chat'],
};

const rootReducer = combineReducers({
    user,
    bus,
    chat,
});
export default persistReducer(persistConfig, rootReducer);
