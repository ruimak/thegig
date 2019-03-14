import React from 'react'



const RelatedArtists = (props) => {
    return (
        <div>
            {console.log(props.artists)}
             {props.artists && props.artists.map(
                 artist=>{
                 return <div>{artist.name} <br/></div>}
             )}
        </div>
      )
}

export default RelatedArtists



