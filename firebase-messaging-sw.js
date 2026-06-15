importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAd9AdG1Yl65SYscJT_hbqXa4HWzC4ky3k",
    authDomain: "dispo-ops.firebaseapp.com",
    projectId: "dispo-ops",
    storageBucket: "dispo-ops.firebasestorage.app",
    messagingSenderId: "933896335434",
    appId: "1:933896335434:web:1be42c24236eb05155b6b3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
