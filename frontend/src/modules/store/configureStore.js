import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);

    // redux-saga 설정
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
