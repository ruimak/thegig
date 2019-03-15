import React from 'react'
import { Link } from 'react-router-dom';



const RelatedArtists = (props) => {
    return (
        <div>{console.log(props.artists, 'these are the related artists')}
             {props.artists && props.artists.map(
                 artist=>{
                 return <div><img href={`/artist/${artist.name}/news`} src={artist.image[1]["#text"]}/><Link to={`/artist/${artist.name}/news`}>{artist.name}</Link><br/></div>}
             )}
        </div>
      )
}

export default RelatedArtists



