import React, { Component } from 'react'
import {getBandInfo} from '../../api'
import RelatedArtists from './RelatedArtists'


export default class BandInfo extends Component {
    state = {
        bio : null
    }

    componentDidMount() {
        
getBandInfo(this.props.params.band).then(bandInfo => {
this.setState({bio:bandInfo.data.artist})
})
    
    } 
    render() {

    
    return (
        <div>
             { this.state.bio && this.state.bio.bio.content}
        </div>
      )
    }
}





