import axios from 'axios'
import firebase from 'firebase'
const { database } = firebase;
const lastFmAPIkey = 'd63d16f26b892d97b89a72c35c36967a'
const ticketMasterAPIkey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0'
const setListAPIkey = '01779b2b-84a5-48ad-b7fb-f9d1eed51cdc'
const mtvNewsAPIkey = 'd356f459298440eab7ae6a18762d0d61'



// API REQUESTS

export const getBandInfo = (bandName => {
return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandName}&api_key=${lastFmAPIkey}&format=json`)
})

export const getArtistEvent = (name => {
    return axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterAPIkey}&keyword=${name}`)
})

export const getSetLists = (mbid => {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/${mbid}/setlists`, {headers: 
    {"x-api-key": setListAPIkey }
})
})

export const getArtistNews = (name => {
    return axios.get(
        `https://newsapi.org/v2/everything?q=${name} AND music&language=en&apiKey=${mtvNewsAPIkey}`
        )
})

// FIREBASE FUNCTIONS

export const createUser = (fName, lName, email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    const newUser = {
      uid,
      fName,
      lName,
      email,
      followedBands: [],
      avatar:
        ''
    };
    return database()
      .ref(`/users/${uid}`)
      .set(newUser)
      .then(() => database()
        .ref('/users')
        .orderByKey()
        .equalTo(uid)
        .once('value')
        .then((data) => {
          console.log(data.val(), '<<< User added to realtime db');
          return data;
        })
        .catch(err => alert(err)))
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.log(error.message);
        }
      });
  });

  export const login = (email, password) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    return database()
      .ref('/users')
      .orderByKey()
      .equalTo(uid)
      .once('value')
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch(err => alert(err));
  });

  export const logout = ()=>{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      {console.log('successfully signed out')}
    }).catch(function(error) {
      // An error happened.
    });
  }

  export const userBandsList = (user) => {
    
     firebase
     .database()
    .ref()
    .once("value")
    .then((userData) =>
    
      {return userData.val().users[user].bands[0]}
     


      )
  }



