import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from "../../firebase.js";

export default class MyBands extends Component {

   state = {
      bandsFollowed : []
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid, 'THIS IS THE USER ID I WANT');
        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              const bands = userData.val().users[user.uid]
                .bands
                ? Object.values(
                    userData.val().users[user.uid].bands
                  )
                : [];
                console.log(bands, 'THESE ARE THE BANDS THAT YOU FOLLOW')
              this.setState({ bandsFollowed: bands });
            }.bind(this)
          );
      }
    });
  }
 render(){
   return(
      <div>
      {this.state.bandsFollowed.map((band)=>{
        return <div><Link to={`/artist/${band}/news`}>{band}</Link><br/></div>
      })}
      </div>
  )} 
} 

