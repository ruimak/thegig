import React, { Component } from 'react'
import {getBandInfo} from '../../api'



export default class BandInfo extends Component {
    state = {
        bio : null
    }

    componentDidMount() {
        
getBandInfo(this.props.params.band).then(bandInfo => {
    console.log(bandInfo)
this.setState({bio:bandInfo.data.artist})
})
    
    } 
    render() {

    
    return (
        <div>
            {/* {console.log(props.params,'YOOOOOOOOOOOOOOOOOOOO')} */}
             { this.state.bio && this.state.bio.bio.content}
        </div>
      )
    }
}





