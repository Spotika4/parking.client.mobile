importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCy9Njqq9nA000Wa7cnAkfztFXWvzbT60k",
    authDomain: "boilerplate-e9185.firebaseapp.com",
    projectId: "boilerplate-e9185",
    storageBucket: "boilerplate-e9185.appspot.com",
    messagingSenderId: "147487591732",
    appId: "1:147487591732:web:bf17c6a209b78466f7a961"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});