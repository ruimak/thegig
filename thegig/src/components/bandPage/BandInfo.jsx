import React from 'react'
import RelatedArtists from './RelatedArtists'


const BandInfo = (props) => {
    return (
        <div>
            {console.log(props, "this is the band info")}
             { props.bandInfo.bio.content}
             <RelatedArtists artists={props.bandInfo.similar.artist}/>
        </div>
      )
}

export default BandInfo



