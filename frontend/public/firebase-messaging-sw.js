/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '%PUBLIC_URL%/스뮤로.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
