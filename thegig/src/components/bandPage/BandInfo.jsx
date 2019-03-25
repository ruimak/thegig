import React, { Component } from "react";
import { getBandInfo } from "../../api";
import RelatedArtists from "./RelatedArtists";
import {Tabs,Avatar,Typography,Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';





class BandInfo extends Component {
  state = {
    bio: null
  };

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandInfo => {
      this.setState({ bio: bandInfo.data.artist });
    });
  }
  
  

  render() {
    console.log(this.props, "this is the bio");
    // const { classes } = this.props.classes;
if(!this.state.bio) {return null}
else return <div className={this.props.classes.wholeScreen}>
  <div className='container'>
  
  <Grid container
  md={15}
  // direction="row"
  // justify="center"
  // alignItems="center"
>
{/* <Grid container md={8}>
<Grid className={this.props.classes.titleAndAvatar} item md={4}> 

<Avatar  direction="row"
  justify="center"
  alignItems="center"   className={this.props.classes.avatar}  src={this.state.bio.image[4]["#text"]} />
</Grid>
<Grid item md={4}> 
<Typography  className={`${this.props.classes.header}`} >{this.state.bio.name}</Typography>

</Grid>
</Grid> */}


<Grid item sm ={9}>
<Typography  inline={true} className={this.props.classes.text}>{this.state.bio.bio.content}</Typography>
</Grid>
<Grid item sm={3}>
<RelatedArtists  artists={Object.values(this.state.bio.similar.artist)}/>
</Grid>
</Grid> 
 </div>
 
</div>

  }
}

const styles = {
  
  container:{
    // paddingLeft:'20%',
    // paddingRight:'20%'
  },
  avatar : {
    height:150,
    width:150
    
  },
  header : {
    fontSize:'3.5em',
    color: '#b288c0',
    fontFamily: "'Lilita One', 'cursive'",
    textColor:'grey',
    paddingTop:'10%'
  
  },
  text : {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize:'1.4em',
    color:'#444',
    lineHeight: 2
  },
  wholeScreen : {
    // paddingRight:'20%',
    // paddingLeft:'20%'
  },
  titleAndAvatar : {
    paddingBottom : '8%'
  }
  
  
}
// console.log(styles,'these are the styles')


export default withStyles(styles)(BandInfo);