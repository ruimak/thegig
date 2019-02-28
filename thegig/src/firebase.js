import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyD2O-V1ze6PhrjEedMWZBQQtb-_XjA--xE",
    authDomain: "ultimate-band.firebaseapp.com",
    databaseURL: "https://ultimate-band.firebaseio.com",
    projectId: "ultimate-band",
    storageBucket: "ultimate-band.appspot.com",
    messagingSenderId: "99879423172"
};
firebase.initializeApp(config);

export default firebase;