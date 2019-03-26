import React, { Component } from 'react'
import {getBillboardCharts} from '../../api'
import { Link } from 'react-router-dom';
import {Paper,Grid,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = {
button : {
    marginTop : '30%',
    marginLeft : '10%',
    
},
buttonText : {
    fontSize : '1.6em'
},
link : {
    textDecoration: 'none'
},
paperSongs : {
    paddingTop: '-8%',
    paddingBottom : '-5%',
    textAlign: 'center',
    fontSize : '0.8em',
    
},
paper : {
    marginTop : '15%',
    marginLeft :'20%',
    marginRight : '20%',
    marginBottom : '10%',
    
    
},
arrowUp : {
    color: 'green',
    paddingRight : '65%',
    position : 'left absolute',
    
},
arrowDown : {
    color : 'red',
    paddingRight : '65%',
    position : 'absolute left',
    

},
rank : {
    fontSize : '1.9em'
},
flatLine : {
    color : 'black',
    paddingRight : '70%',
    position : 'left absolute',
    paddingTop: '-25%'

},
title : {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize : '2.1em'
}
}

class Billboards extends Component {
    state = {
        charts:[],
        buttonClicked : ''
    }

    componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(keyWord) {
       getBillboardCharts(keyWord).then(tracks=>{
            this.setState({charts : tracks.data,
            buttonClicked : keyWord})
        })
}
   
  render() {
      console.log(this.state,'this is the chsrts ')
        const listOfButtons = [['Hot100', 'hot-100'], ['RnB', 'rnb'], ['Top UK', 'uksongs'], ['Top Rock', 'rock'], ['Top Pop', 'pop'] ]
const chartButton = (name, keyWord) => {
    return <div >
        
        <Button className={this.props.classes.buttonText} name={name} onClick={()=>this.handleClick(keyWord)}>
        {name}
        </Button> 
        
        </div>
}

    return (
      <div className={this.props.classes.button}>
          <Grid container xs={12}>
             {listOfButtons.map((element, index)=>{
                 
                 return <Grid item xs={2}>{chartButton(listOfButtons[index][0], listOfButtons[index][1])}</Grid>
                 
             }) }
             </Grid>
              {this.state.charts !== null ?
        <Paper className={this.props.classes.paper}>
        {this.state.charts.map((track,i) => {
            if(this.state.buttonClicked) { 
                if(track.position.positionLastWeek > i + 1) {
                    return  <Link className={this.props.classes.link} 
                 to={`/artist/${track.artist}/song/${track.title}`}>
                 <Paper className={this.props.classes.paperSongs}>
                  <h1 className={this.props.classes.rank}>#{track.rank}
                  <Icon fontSize={'large'} className={this.props.classes.arrowUp}>arrow_upward</Icon>
                  </h1><h1 className={this.props.classes.title}>{track.title}</h1> <h1 className={this.props.classes.title}>{track.artist}</h1></Paper>
            </Link>

                }
                else if(track.position.positionLastWeek === i){    
                 return  <Link className={this.props.classes.link} 
                 to={`/artist/${track.artist}/song/${track.title}`}>
                 <Paper className={this.props.classes.paperSongs}>
                 <h1 className={this.props.classes.rank}>#{track.rank}<Icon fontSize={'large'} className={this.props.classes.flatLine}>
                 trending_flat</Icon></h1><h1 className={this.props.classes.title}>{track.title}</h1> <h1 className={this.props.classes.title}>{track.artist}</h1></Paper>
            </Link> 
                }
                else if(track.position.positionLastWeek === null){
                    return  <Link className={this.props.classes.link} 
                 to={`/artist/${track.artist}/song/${track.title}`}>
                 <Paper className={this.props.classes.paperSongs}>
                 <h1 className={this.props.classes.rank}>#{track.rank}<Icon fontSize={'large'} className={this.props.classes.flatLine}>
                 trending_flat</Icon></h1><h1 className={this.props.classes.title}>{track.title}</h1> <h1 className={this.props.classes.title}>{track.artist}</h1></Paper>
            </Link> 
                }
                else{
                    return  <Link className={this.props.classes.link} 
                 to={`/artist/${track.artist}/song/${track.title}`}>
                 <Paper className={this.props.classes.paperSongs}>
                 <h1 className={this.props.classes.rank}>#{track.rank}
                 <Icon fontSize={'large'} className={this.props.classes.arrowDown}>
                 arrow_downward</Icon></h1><h1 className={this.props.classes.title}>{track.title}</h1> <h1 className={this.props.classes.title}>{track.artist}</h1></Paper>
            </Link> 
                }

            
        
        }})}  </Paper> 
        
             : 
             null}
      </div>
    )
  }
}


export default withStyles(styles)(Billboards)