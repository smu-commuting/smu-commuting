/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
    apiKey: 'AIzaSyCqOQnx0fQH4Eat-XIKsEpCVDzi9T13g8k',
    authDomain: 'smulo-6a935.firebaseapp.com',
    projectId: 'smulo-6a935',
    storageBucket: 'smulo-6a935.appspot.com',
    messagingSenderId: '747757992302',
    appId: '1:747757992302:web:ac8c1bffab51db63d1e97f',
    measurementId: 'G-F8EJXLWY6S',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    console.log(
        '[firebase-messaging-sw.js] Received background message 뒷단',
        payload,
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '%PUBLIC_URL%/스뮤로.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
