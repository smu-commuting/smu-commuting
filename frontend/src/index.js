/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import configureStore from './modules/store/configureStore';
import App from './pages/App';
import './styles/_reset.scss';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register(`/service-worker.js`)
        .then(registration => {
            console.log('sw - Registration successful:', registration);
        })
        .catch(err => {
            console.log('Service worker registration failed, error:', err);
        });
    navigator.serviceWorker
        .register(`/firebase-messaging-sw.js`)
        .then(registration => {
            console.log('fb - Registration successful:', registration);
        })
        .catch(err => {
            console.log('Service worker registration failed, error:', err);
        });
}

axios.defaults.withCredentials = true;
const store = configureStore();
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);

serviceWorkerRegistration.unregister();
reportWebVitals();
