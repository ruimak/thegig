import React, { Component } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { getBandInfo } from "../api";
import { Avatar, Typography, Grid } from "@material-ui/core";
import FollowUnfollowButton from "./bandPage/FollowUnfollowButton";

const styles = theme => ({
  input: {
    display: "none"
  },

  avatar: {
    height: 210,
    width: 210,
    marginLeft:'15%',
    border:'solid',
    borderWidth:'1px',
    borderColor:'#545495'
  },
  header: {
    fontSize: "4em",
    color: "#BBCFE7",
    fontFamily: "'Lilita One', 'cursive'",
    textColor: "grey",
    paddingTop: "4vh"
  },
  text: {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "1.4em",
    color: "#444",
    lineHeight: 2
  },
  titleAndAvatar: {
    paddingBottom: "2%"
  }
});

class NavBar extends Component {
  state = {
    bio: null
  };

  componentDidMount() {
    this.props.params &&
      getBandInfo(this.props.params.band).then(bandInfo => {
        
        this.setState({ bio: bandInfo.data.artist });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.params && this.props.params.band !== prevProps.params.band) {
      getBandInfo(this.props.params.band).then(bandInfo => {
        this.setState({ bio: bandInfo.data.artist });
      });
    }
  }

  render() {
    const navBarComponent = (
      <div className={"Inline"} style={{ width: "100%"}}>
        {this.props.params && this.state.bio && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container md={10} >
              <Grid className={this.props.classes.titleAndAvatar} item md={4} >
                <Avatar
                justify='center'
                  className={this.props.classes.avatar}
                  src={this.state.bio.image[4]["#text"]}
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={`${this.props.classes.header}`} style={{WebkitTextStroke:'1px #545495'}}>
                  {this.state.bio.name}
                </Typography><div style={{color:'red', marginLeft:"10%", marginBottom:"2%"}}>{this.state.bio.ontour==='0' ? null : '(On Tour)'}</div>
                <FollowUnfollowButton params={this.props.params} />
              </Grid>
            </Grid>
          </div>
        )}

        {this.props.params
          ? <div style={{display: 'flex', justifyContent: 'center'}}>{this.props.tabs.map(tab => {
              return (
                <div
                  className="Inline"
                  style={{ paddingLeft: "1%", paddingRight: "1%",  width:'13%' }}
                  key={tab[0]}
                >
                  <Button
                    component={Link}
                    to={`/artist/${this.props.params.band}/${tab[0]}/`}
                    className="NavBar"
                    variant="outlined"
                    style={{backgroundColor:'white', color:'#545495',  width:'100%' }}
                  >
                    {tab[1]}
                  </Button>
                </div>
              );
            })}</div>
          : this.props.tabs.map(tab => {
              return (
                <div className="Inline" key={tab[0]}>
                  <Button
                    color="primary"
                    variant="text"
                    style={{
                      paddingLeft: "5vh",
                      paddingRight: "5vh",
                      paddingTop: "1vh"
                    }}
                    component={Link}
                    to={`/${tab[0]}`}
                    className="NavBar"
                  >
                    {tab[1]}
                  </Button>
                </div>
              );
            })}
      </div>
    );
    return <div>{navBarComponent} </div>;
  }
}

export default withStyles(styles)(NavBar);
