import React from 'react'



const BandInfo = (props) => {
    return (
        <div>
            {console.log(props)}
             { props.bandInfo.bio.content}
        </div>
      )
}

export default BandInfo



