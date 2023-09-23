// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCy9Njqq9nA000Wa7cnAkfztFXWvzbT60k",
	authDomain: "boilerplate-e9185.firebaseapp.com",
	projectId: "boilerplate-e9185",
	storageBucket: "boilerplate-e9185.appspot.com",
	messagingSenderId: "147487591732",
	appId: "1:147487591732:web:bf17c6a209b78466f7a961"
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const requestToken = (setTokenFound) => {
	Notification.requestPermission().then((permission) => {
		console.log('User Permission: ', permission);
		if (permission === "granted") {
			return getToken(messaging, {vapidKey: 'BG5S08LXraCb8m2SeXsXkJSEkJvWeQ9SmmODPOqPSl20LU_xvlVz4Yu_B6HQoRcEVYSurAlMVfimttR61BqwF-M'}).then((currentToken) => {
				if (currentToken) {
					// prompt('Токен', currentToken);
					console.log('User Token: ', currentToken);
					// Track the token -> client mapping, by sending to backend server
					// show on the UI that permission is secured
				} else {
					console.log('No registration token available. Request permission to generate one.');
					// shows on the UI that permission is required
				}
			}).catch((err) => {
				console.log('An error occurred while retrieving token. ', err);
				// catch error while creating client token
			});
		} else {
			console.log("User Permission Denied.");
		}
	});
};

export const onMessageListener = () => {
	return new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
