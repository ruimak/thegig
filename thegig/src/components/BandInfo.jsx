import React from 'react'



const BandInfo = (props) => {
    return (
        <div>
            {props.bandInfo.bio.content}
{console.log(props)}
        </div>
      )
}

export default BandInfo



