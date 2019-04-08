import axios from "axios";
import firebase from "firebase";


const { database } = firebase;



// API REQUESTS

export const getTrack = (artist, track) => {
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artist} ${track}`
  );
};

export const getBandSuggestions = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${bandName}&api_key=${process.env.REACT_APP_lastFmAPIkey}&format=json`
  );
};

export const getSongSuggestions = song => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${song}&api_key=${process.env.REACT_APP_lastFmAPIkey}&format=json`
  );
};

export const getBandInfo = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandName}&api_key=${process.env.REACT_APP_lastFmAPIkey}&format=json`
  );
};

export const getSongInfo = (bandName, songTitle) => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_lastFmAPIkey}&artist=${bandName}&track=${songTitle}&autocorrect[1]&format=json`
  );
};

//If you change the size parameter you will get more-less events, making it more accurate/faster
export const getEventsForLocation = (location, radius) => {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&radius=${radius}&geoPoint=${location}&size=80&apikey=${process.env.REACT_APP_ticketMasterAPIkey}`
  );
};

export const getDiscography = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${bandName}&api_key=${process.env.REACT_APP_lastFmAPIkey}&format=json`
  );
};

export const getAlbumInfo = (bandName, albumName) => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_lastFmAPIkey}&artist=${bandName}&album=${albumName}&format=json`
  );
};

export const artistSuggestFromGenre = ids => {
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?format=json&${ids}&page_size=10&page=1&apikey=fb62ad704ddfdef75fa06f8fb295f3a8`
  );
};

export const getTopArtistSongs = bandName => {
  return axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${bandName}&api_key=${process.env.REACT_APP_lastFmAPIkey}&format=json`
  );
};

export const getArtistEvent = name => {
  return axios.get(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_ticketMasterAPIkey}&keyword=${name}`
  );
};

export const getSetLists = mbid => {
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/${mbid}/setlists`,
    { headers: { "x-api-key": process.env.setListAPIkey } }
  );
};

export const getArtistNews = name => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${name} AND music&language=en&apiKey=${process.env.REACT_APP_mtvNewsAPIkey}`
  );
};
export const getFollowedBandNews = name => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${name} AND music&language=en&apiKey=${process.env.REACT_APP_mtvNewsAPIkey}`
  );
};

export const getAllBandNews = () => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=music&sources=mtv-news,mtv-news-uk&language=en&apiKey=${process.env.REACT_APP_mtvNewsAPIkey}`
  );
};

export const getBillboardCharts = typeOfChart => {
  return axios.get(` https://thegig.herokuapp.com/${typeOfChart}`);
};

export const getLyrics = (artist, songTitle) => {
  return axios.get(
    `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${songTitle}&q_artist=${artist}&apikey=${process.env.REACT_APP_musixmatchAPIkey}`
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
        avatar: "",
        radius: 20
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
    })
    .catch(err => {
      alert(err);
    });

export const createUserWithFacebook = (fName, lName, email, userId) => {
  const newUser = {
    userId,
    fName,
    lName,
    email,
    followedBands: [],
    avatar: "",
    radius: 20
  };
  return database()
    .ref(`/users/${userId}`)
    .set(newUser)
    .then(() =>
      database()
        .ref("/users")
        .orderByKey()
        .equalTo(userId)
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
};

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
        .catch(err => alert(err));
    })
    .catch(err => {
      alert(err);
    });

export const logout = () => {
  return firebase
    .auth()
    .signOut()
    // .then(() => {
    //   alert("Successfully logged out, hope to see you soon!");
    // })
    .catch(
      err => alert(err)
      // An error happened.
    );
};

export const updateUser = (uid, entriesToUpdateObj) =>
  database()
    .ref(`/users/${uid}`)
    .update(entriesToUpdateObj)
    .then(() => {
      alert(JSON.stringify(entriesToUpdateObj));
    })
    .catch(err => alert(err));

export const changePassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword)
    .then(() => {
      let user = firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          alert("password was changed");
        })
        .catch(err => {
          alert(err.message);
        });
    })
    .catch(err => {
      alert(err.message);
    });
};

export const reauthenticate = currentPassword => {
  let user = firebase.auth().currentUser;
  let cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

export const addBandToFollowedList = (userId, bandName) => {
  firebase
    .database()
    .ref(`/users/${userId}`)
    .child("/bands")
    .push(bandName)
    .catch(err => {
      alert(err.message);
    });
};

export const removeBandFromFollowedList = (userId, bandName) => {
  const query = firebase
    .database()
    .ref(`/users/${userId}/bands`)
    .orderByValue()
    .equalTo(bandName)
    

  query.once("value", function(snapshot) {
    snapshot.ref.update({ [snapshot.node_.children_.root_.key]: null });
  }).catch(err => {
      alert(err.message);
    });;
};

export const getUsersFollowedBand = user => {
  database
    .ref("bands")
    .get()
    .then(snapshot => {
      // console.log(snapshot.docs)
    });
};
