import React, { Component } from "react";
import {
  addBandToFollowedList,
  removeBandFromFollowedList
} from "../../api.js";
import firebase from "../../firebase.js";
import Button from "@material-ui/core/Button";

export default class SignIn extends Component {
  state = {
    bandsFollowed: [],
    userId: null
  };

  addOrRemoveBand = (command, id, band) => {
    if (command === "follow") {
      const newArray = this.state.bandsFollowed;
      newArray.push(band);
      this.setState({ bandsFollowed: newArray });
      addBandToFollowedList(id, band);
    } else {
      const index = this.state.bandsFollowed.indexOf(band);
      if (index > -1) {
        const newArray = this.state.bandsFollowed;
        newArray.splice(index, 1);
        this.setState({ bandsFollowed: newArray });
      }
      removeBandFromFollowedList(id, band);
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              const bands = userData.val().users[user.uid].bands
                ? Object.values(userData.val().users[user.uid].bands)
                : [];
              this.setState({ bandsFollowed: bands });
            }.bind(this)
          );
      }
    });
  }

  render() {
    if (!this.state.bandsFollowed.includes(this.props.params.band)) {
      return (
        <Button
          onClick={() => {
            this.addOrRemoveBand(
              "follow",
              this.state.userId,
              this.props.params.band
            );
          }}
          variant="extendedFab"
          color="primary"
          style={{backgroundColor:'#738DD9',boxShadow: '3px 3px 8px #545495'}}
        >
          {"Follow"}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            this.addOrRemoveBand(
              "unfollow",
              this.state.userId,
              this.props.params.band
            );
          }}
          variant="extendedFab"
          color="primary"
          style={{backgroundColor:'#738DD9',boxShadow: '3px 3px 8px #545495'}}

        >
          {"Unfollow"}
        </Button>
      );
    }
  }
}
