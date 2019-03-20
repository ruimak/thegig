import React, { Component } from 'react'
import {getAllBandNews} from '../../api'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel'
import firebase from "firebase";
import {getFollowedBandNews} from '../../api'
import {Tabs,Avatar,Typography,Grid,Slide, GridList} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const { red, blue, green } = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;

const { database } = firebase;


class HomeBandNews extends Component {
  
  state = {
      bandNews : [],
      carousel : []
      
      
  }



  componentDidMount() {
//    firebase.database.ref('bands').on('value',(data => {
// console.log(data,'this is data')
//    }))
    

//DANNYS ALGORYTHM

//    const bands =  ['foals','eagles']
//    const lol = bands.map(band => {
// return ` ${band} OR`
//    })
//    const lolagain = lol.reduce((acc, culval,index) => {
     
//       return acc + culval
//    },'')
//    const hi = lolagain.substring(0,lolagain.length-2)
//    console.log(hi,'OOOOOOOOOOO********&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
   
//    console.log(typeof lolagain,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp')
//    console.log([...lol].concat(lol),'{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}')
//    getFollowedBandNews(hi).then(data => {
//      console.log(data,'kkkkkkkkkkkkkkkkkggggggggggggggggggggggggggg')
//    })

    getAllBandNews().then(bandNews => {
          this.setState({bandNews : bandNews.data.articles,
          carousel:bandNews.data.articles[0]})
      })
  
  }
  

    render() {
      let firsthalfnews = this.state.bandNews !== [] ? this.state.bandNews.slice(0,10) : null
      let secondhalfnews = this.state.bandNews !== [] ? this.state.bandNews.slice(10,20) : null
      console.log(this.state,'this is the band news')
      console.log(firsthalfnews,'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
      console.log(secondhalfnews,'77777777777777777777777')
      
    return (
      
      <div  className={this.props.classes.root}>
        {/* {this.state.carousel !== null ?  <div style={{ position: 'relative', width: '100%', height: 500 }}> */}
  
  {/* <AutoRotatingCarousel
  
  
  classes={this.props.classes.position}
  >
    <Slide
      media={<img src={this.state.carousel.urlToImage}classes={this.props.classes.height}/>}
      title='Ever wanted to be popular?'
      subtitle='Well just mix two colors and your are good to go!'
      classes={this.props.classes.backgroundColor}
    /> */}
     {/* <Slide
      media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
      title='Ever wanted to be popular?'
      subtitle='Well just mix two colors and your are good to go!'
    />
    <Slide
      media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
      title='Ever wanted to be popular?'
      subtitle='Well just mix two colors and your are good to go!'
    />  */}
  {/* </AutoRotatingCarousel> */}
{/* </div> : 'no news'} */}
 <Grid container item sm={12} >
 <Grid item sm={6}>
          {this.state.bandNews !== null ? firsthalfnews.map(news => {
            
        return (
        <div >
          <Grid item md={6}>
          <h1>{news.title}</h1>
        <img src={news.urlToImage}className={this.props.classes.image} height="250" width="350" />
        <Grid container item sm={10} direction="row"
  justify="center"
  alignItems="center">>
        {news.content !== null ? news.content.substring(0,70) : null}
        
        <a className={this.props.classes.link} href={news.url}>{news.url.substring(0,30)}</a>
        </Grid>
        </Grid>
        
        
        
        

        
        </div>
        
        
        )
        }) : 'no news to display'}
      </Grid>
      
      <Grid item sm={6}>
      {this.state.bandNews !== null ? secondhalfnews.map(news => {
           
        return (
        <div >
          <Grid item md={6}>
          <h1>{news.title}</h1>
        <img className={this.props.classes.image} src={news.urlToImage} height="250" width="350" />
        <Grid container item sm={10} direction="row"
  justify="center"
  alignItems="center">>
        {news.content !== null ? news.content.substring(0,70) : null}
        
        <a className={this.props.classes.link} href={news.url}>{news.url.substring(0,30)}</a>
        </Grid>
        </Grid>
        
        
        
        

        
        </div>
        
        
        )
        }) : 'no news to display'}
        </Grid>    
          </Grid>
      </div>
    )
    
  }
  
}
const styles = {
  position : {
    position: 'absolute' 
  },
  backgroundColor : {
     backgroundColor: red
  },
  height : {
    height : '500',
    width  : '100%'
  },
  root: {
    flexGrow : 1,
    paddingRight:'25%',
    paddingLeft:'25%',

    paddingTop:'10%'
  },
  image : {
paddingBottom : '8%'
  },
  link : {
    paddingBottom : '15%'
  }
  
  
}

export default withStyles(styles)(HomeBandNews)