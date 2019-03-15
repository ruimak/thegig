import React from 'react'



const RelatedArtists = (props) => {
    return (
        <div>
             {props.artists && props.artists.map(
                 artist=>{
                 return <div>{artist.name} <br/></div>}
             )}
        </div>
      )
}

export default RelatedArtists



