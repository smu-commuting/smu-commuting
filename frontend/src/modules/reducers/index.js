/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import bus from './bus';
import taxi from './taxi';
import chat from './chat';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user,
    bus,
    taxi,
    chat,
});
export default persistReducer(persistConfig, rootReducer);
