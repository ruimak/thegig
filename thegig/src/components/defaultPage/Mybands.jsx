import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase.js";
import { removeBandFromFollowedList } from "../../api.js";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import "../../styles/defaultPage.css";
import '../../styles/App.css'
import {bandRemover} from './utils'

const styles = theme => ({
  position: {
    position: "absolute"
  },

  height: {
    height: "500",
    width: "100%"
  },
  root: {
    flexGrow: 1
    // paddingRight: "25%",
    // paddingLeft: "25%",

    // paddingTop: "10%"
  },
  image: {
    paddingBottom: "8%"
  },
  link: {
    paddingBottom: "15%"
  },
  fab: {
    margin: theme.spacing.unit,
    height: "2px"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(
  class MyBands extends Component {
    state = {
      bandsFollowed: [],
      user: null
    };

    unfollowBand = band => {
      let bandsInState = this.state.bandsFollowed;
      //bandRemover scans an array and deletes a band if there is a match.
      bandRemover(bandsInState, band)
      //Removing said band from state and from the firebase.
      this.setState({ bandsFollowed: bandsInState });
      removeBandFromFollowedList(this.state.user, band);
    };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ user: user.uid });
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
      const { classes } = this.props;
      return (
        <div className={this.props.classes.root} style={{paddingTop: "5vh"}}>
          <h1 className="title" style={{paddingBottom:'5vw'}}>{"My Bands"}</h1>{" "}
          <div className='centered-container'>  {this.state.bandsFollowed.sort().map(band => {
            // Remove the sort if you want the bands to be displayed by date-followed. We can add sorting buttons later. 
            return (
              <div className='stand-out-container' style={{marginLeft:'25%',width:'50%',marginBottom:'1%', textAlign:'left'}}>
                <Fab
                  color="primary"
                  size="small"
                  aria-label="Delete"
                  className={classes.fab}
                >
                  <DeleteIcon
                  data-cy="MybandRemove"
                    className={classes.deleteIcon}
                    onClick={() => {
                      this.unfollowBand(band);
                    }}
                  />
                </Fab>
                <Link data-cy="MybandLink" to={`/artist/${band}/news`}>{band}</Link>
                <br />
              </div>
            );
          })}</div>
         
        </div>
      );
    }
  }
);
