import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import configureStore from './modules/store/configureStore';
import App from './pages/App';
import './styles/_reset.scss';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register(`/firebase-messaging-sw.js`)
        .then(function (registration) {
            // messaging.useServiceWorker(registration);
            console.log(
                'Registration successful, scope is:',
                registration.scope,
            );
        })
        .catch(function (err) {
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
