import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './modules/store/configureStore';
import App from './pages/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/_reset.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store()}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
