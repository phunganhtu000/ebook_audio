import * as firebase from 'firebase';

const config = {

    apiKey: 'AIzaSyDQZ1gSisF-KC61wKQCituw88riVgV7lN0',
    authDomain: 'econtent-c848c.firebaseapp.com',
    databaseURL: 'https://econtent-c848c.firebaseio.com',
    projectId: 'econtent-c848c',
    storageBucket: '',
    messagingSenderId: '33899068605',
};
export default !firebase.apps.length ?
    firebase.initializeApp(config) : firebase.app();
