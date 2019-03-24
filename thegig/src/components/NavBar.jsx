import React, { Component } from "react";
import "../NavBar.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { getBandInfo } from "../api";
import { Tabs, Avatar, Typography, Grid } from "@material-ui/core";
import FollowUnfollowButton from "./bandPage/FollowUnfollowButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 9
  },
  input: {
    display: "none"
  },
  
  avatar : {
    height:180,
    width:180,

    
  },
  header : {
    fontSize:'3.5em',
    color: '#b288c0',
    fontFamily: "'Lilita One', 'cursive'",
    textColor:'grey'
  
  },
  text : {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize:'1.4em',
    color:'#444',
    lineHeight: 2
  },
  wholeScreen : {
    paddingRight:'20%',
    paddingLeft:'20%'
  },
  titleAndAvatar : {
    paddingBottom : '8%'
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
    const { classes } = this.props;

    const navBarComponent = (
      <div  className={'Inline'}>
      
        {this.props.params && this.state.bio && (
          <div>
            <Grid container md={8}>
              <Grid className={this.props.classes.titleAndAvatar} item md={4}>
                <Avatar
                 
                  className={this.props.classes.avatar}
                  src={this.state.bio.image[4]["#text"]}
                />
              </Grid>
              <Grid item md={4}>
                <Typography className={`${this.props.classes.header}`}>
                  {this.state.bio.name}
                </Typography>   <FollowUnfollowButton params={this.props.params} />
              </Grid>
            </Grid>

         
          </div>
        )}

        {this.props.params
          ? this.props.tabs.map(tab => {
              return (
                <div className="Inline" key={tab[0]}>
                  <Button
                    className={classes.button}
                    component={Link}
                    to={`/artist/${this.props.params.band}/${tab[0]}/`}
                    className="NavBar"
                    variant='outlined'
                  >
                    {tab[1]}
                  </Button>
                </div>
              );
            })
          : this.props.tabs.map(tab => {
              return (
                <div className="Inline" key={tab[0]}>
                  <Button
                    className={classes.button}
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
