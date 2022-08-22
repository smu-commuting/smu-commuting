/* eslint-disable no-unused-vars */
import { toast } from 'react-hot-toast';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../constants/firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

const messaging = getMessaging();

getToken(messaging, {
    vapidKey:
        'BNglI-efqMG6EoE8u72FXsYiGGFL94A9M7SdKDWrqFeqA1qL8mLwVd5Mm3sVTO2km4IFu-CABXjO7Bnw9aAKsMw',
})
    .then(currentToken => {
        if (currentToken) {
            localStorage.setItem('FBToken', currentToken);
        } else {
            // Show permission request UI
            // ...
        }
    })
    .catch(err => {
        // ...
    });

onMessage(messaging, payload => {
    toast(payload.notification.body);
});
