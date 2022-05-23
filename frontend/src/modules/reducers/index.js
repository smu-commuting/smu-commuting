/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import bus from './bus';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'bus'],
};

const rootReducer = combineReducers({
    user,
    bus,
});
export default persistReducer(persistConfig, rootReducer);
