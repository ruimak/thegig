import React from "react";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import logo from "../../cropped.jpg";
import "../../styles/App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase.js";
import { createUserWithFacebook } from "../../api";

//This is the Logout component, a simple button that you can press and immediately log out.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  // callBacks: {
  //   signInSuccessWithAuthResult: (data) => {
  //     createUserWithFacebook("bart", "simpson", "bart@simpson.com").then(something=>console.log(data,something));
  //   }
  // }
};

const AuthenticationScreen = props => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        className="top-purple-bar"
        style={{ width: "100%", height: "15%", backgroundColor: "#63458a" }}
      >
        <img
          src={logo}
          height="75%"
          alt="logo"
          style={{ marginLeft: "5%", marginTop: "1%" }}
        />
      </div>
      <div className="centered-container" style={{ textAlign: "center" }}>
        <h1 style={{ textAlign: "center" }}>Welcome to The Gig!</h1>
        {
          "In this app you will be able to discover new songs and bands, learn more about the bands you enjoy and most important, keep up to date with all the events and news regarding music!"
        }
      </div>
      <LogIn />
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <div className="centered-container" style={{ textAlign: "center" }}>
        {
          "Or if you dont have an account you can create one. Its quick! And we will need a prefered location. You can later update all this information in the settings."
        }
      </div>
      <SignIn />
    </div>
  );
};

export default AuthenticationScreen;
