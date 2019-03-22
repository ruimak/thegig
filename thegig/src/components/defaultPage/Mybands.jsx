import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from "../../firebase.js";
import {removeBandFromFollowedList} from '../../api.js'

export default class MyBands extends Component {

   state = {
      bandsFollowed : [],
      user: null 
  }
  unfollowBand = (band, )=>{
    let bandsInState = this.state.bandsFollowed
    for (let i=bandsInState.length-1; i>=0; i--) {
      if (bandsInState[i] === band) {
        bandsInState.splice(i, 1);
          break;       //<-- Uncomment  if only the first term has to be removed
      }
  }
  this.setState({bandsFollowed:bandsInState})
  removeBandFromFollowedList(this.state.user, band)
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user:user.uid})
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
        return <div><Link to={`/artist/${band}/news`}>{band}</Link><div onClick={()=>{this.unfollowBand(band)}}>{'X'}</div><br/></div>
      })}
      </div>
  )} 
} 

