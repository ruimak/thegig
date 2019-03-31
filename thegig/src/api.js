import axios from "axios";
import firebase from "firebase";
const { database } = firebase;
const lastFmAPIkey = "d63d16f26b892d97b89a72c35c36967a";
const ticketMasterAPIkey = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";
const setListAPIkey = "01779b2b-84a5-48ad-b7fb-f9d1eed51cdc";
const mtvNewsAPIkey = "d356f459298440eab7ae6a18762d0d61";
const googleAPIkey = "AIzaSyA3m4wya3xoNIm5M5vzhUUdX56I4upK4ME";
const spotifyClientid = "a5daa539d04b45b481d35143568b01d0";
const musixmatchAPIkey = "6eeab426384ac332ae0f5ff63ced9b95";

// API REQUESTS

export const getTrack = (artist, track) => {
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artist} ${track}`
  )
};

export const getBandSuggestions = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${bandName}&api_key=${lastFmAPIkey}&format=json`
  );
};

export const getSongSuggestions = song => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${song}&api_key=${lastFmAPIkey}&format=json`
  );
};

export const getBandInfo = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandName}&api_key=${lastFmAPIkey}&format=json`
  );
};

export const getSongInfo = (bandName, songTitle) => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastFmAPIkey}&artist=${bandName}&track=${songTitle}&autocorrect[1]&format=json`
  );
};


//YOU NEED TO CHANGE THE SIZE PARAMETER IN ORDER TO GET MORE EVENTS
export const getEventsForLocation = (location, radius) => {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&radius=${radius}&geoPoint=${location}&size=400&apikey=${ticketMasterAPIkey}`
  );
};

export const getDiscography = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${bandName}&api_key=${lastFmAPIkey}&format=json`
  );
};

export const getAlbumInfo = (bandName, albumName) => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFmAPIkey}&artist=${bandName}&album=${albumName}&format=json`
  );
};

export const getTopArtistSongs = (bandName) => {
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${bandName}&api_key=${lastFmAPIkey}&format=json`)
}




export const getArtistEvent = name => {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterAPIkey}&keyword=${name}`
  );
};

export const getSetLists = mbid => {
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/${mbid}/setlists`,
    { headers: { "x-api-key": setListAPIkey } }
  );
};

export const getArtistNews = name => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${name} AND music&language=en&apiKey=${mtvNewsAPIkey}`
  );
};
export const getFollowedBandNews = name => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${name} AND music&language=en&apiKey=${mtvNewsAPIkey}`
  );
};

export const getAllBandNews = () => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=music&sources=mtv-news,mtv-news-uk&language=en&apiKey=${mtvNewsAPIkey}`
  );
};

export const getBillboardCharts = typeOfChart => {
  return axios.get(` https://thegig.herokuapp.com/${typeOfChart}`);
};

export const getLyrics = (artist, songTitle) => {
  return axios.get(
    `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${songTitle}&q_artist=${artist}&apikey=${musixmatchAPIkey}`
  );
};

// FIREBASE FUNCTIONS

export const createUser = (fName, lName, email, password) =>
  firebase
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
        avatar: ""
      };
      return database()
        .ref(`/users/${uid}`)
        .set(newUser)
        .then(() =>
          database()
            .ref("/users")
            .orderByKey()
            .equalTo(uid)
            .once("value")
            .then(data => {
              return data;
            })
            .catch(err => alert(err))
        )
        .catch(error => {
          if (error.code === "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            console.log(error.message);
          }
        });
    });

export const login = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const { uid } = user;
      return database()
        .ref("/users")
        .orderByKey()
        .equalTo(uid)
        .once("value")
        .then(data => {
          if (data) {
            return data;
          }
        })
        .catch(err => alert(err))
  });

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      {
        console.log("successfully signed out");
      }
    })
    .catch(function(error) {
      // An error happened.
    });
  }

  export const updateUser = (uid, entriesToUpdateObj) => database()
 .ref(`/users/${uid}`)
 .update(entriesToUpdateObj);


 export const changePassword = (currentPassword,newPassword) => {
   reauthenticate(currentPassword).then(() => {
       let user = firebase.auth().currentUser
       user.updatePassword(newPassword).then(() => {
         alert('password was changed')
       }).catch((err) => {
         alert(err.message)
       })
   }).catch((err) => {
   alert(err.message)
   })
   }

   export const reauthenticate = (currentPassword) => {
     let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPassword);
    return user.reauthenticateWithCredential(cred)

   }
  
  export const addBandToFollowedList = (userId, bandName) => {
    firebase.
    database()
    .ref(`/users/${userId}`)
    .child("/bands")
    .push(bandName)
};

export const removeBandFromFollowedList = (userId, bandName) => {
  const query = firebase
    .database()
    .ref(`/users/${userId}/bands`)
    // .child('/bands')
    .orderByValue()
    .equalTo(bandName);

  query.once("value", function(snapshot) {
    snapshot.ref.update({ [snapshot.node_.children_.root_.key]: null });
  });
};

export const getUsersFollowedBand = (user => {
  database.ref('bands').get().then(snapshot => {
console.log(snapshot.docs)
  })
})
