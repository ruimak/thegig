import React, { Component } from "react";
import "../../styles/defaultPage.css";
import "../../styles/App.css";
import errorImage1 from "../../confusedBand.jpg";
import errorImage2 from "../../guitarBreak.jpeg";

export default class InvalidUrl extends Component {
  render() {
    let randomNumber = Math.floor(Math.random() * 2) + 1  
    
    return (
      <div className="centered-container">
        <img
          src={
            randomNumber===1 ? errorImage1 : errorImage2
          }
          alt="Error page band"
          className="centered-container"
          style={
            randomNumber===1
              ? {
                  width: "40vw",
                  display: "flex",
                  marginTop: "10%",
                  border: "solid",
                  borderWidth: "1px",
                  borderColor: "black"
                }
              : {
                  width: "30vw",
                  display: "flex",
                  marginTop: "10%",
                  border: "solid",
                  borderWidth: "1px",
                  borderColor: "black"
                }
          }
        />
        <div
          className="stand-out-container"
          style={{ width: "40%", paddingTop: "2%", paddingBottom: "5%", paddingLeft:'5%', paddingRight:'5%' }}
        >
          <h1>{"Whoops, someone got lost"}</h1>
          <div>
            {"This url falls outside of the arena, go back to the concert!"}
          </div>
        </div>
      </div>
    );
  }
}
