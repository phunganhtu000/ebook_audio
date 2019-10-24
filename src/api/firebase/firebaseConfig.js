import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDeYxEyK09y4HwvlCxA2wHY1f5-loTbspE',
    authDomain: 'ebook-d9937.firebaseapp.com',
    databaseURL: 'https://ebook-d9937.firebaseio.com',
    projectId: 'ebook-d9937',
    storageBucket: 'ebook-d9937.appspot.com',
    messagingSenderId: '872612520063',
    appId: '1:872612520063:web:c68aeddfd8dff76e3a5f4a',
    measurementId: 'G-CQT5PL3V8R',
};
export const firebaseConfig = firebase.initializeApp(config);
