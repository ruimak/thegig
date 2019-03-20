import React from 'react'
import { Link } from 'react-router-dom';
import {Tabs,Avatar,Typography,Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';




const RelatedArtists = (props) => {
    return (
        <div direction="column"
        justify="center"
        alignItems="center" className={props.classes.relatedArtists}>{console.log(props.artists, 'these are the related artists')}
             {props.artists && props.artists.map(
                 artist=>{
                 return <div className={props.classes.individualArtist}><Avatar className={props.classes.avatar} href={`/artist/${artist.name}/news`} src={artist.image[1]["#text"]}/><Link className={props.classes.link}  to={`/artist/${artist.name}/news`}>{artist.name}</Link><br/></div>}
             )}
        </div>
      )
}

const styles = {
    avatar : {
        height:100,
    width:100,
    },
    relatedArtists : {
        paddingLeft:'100px'
    },
    individualArtist: {
        paddingBottom : '25px'
    },
    link : {
        fontFamily: "'Titillium Web', 'sans-serif'",
        textDecoration: 'none',
        marginLeft:'15px',
        '&.active, &:hover, &.active:hover' : {
            color: '#9a48d0'
            
        }
        
    }
}

export default withStyles(styles)(RelatedArtists)



