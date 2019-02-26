import React, { Component } from 'react'
import {getBandInfo} from '../api'

export default class SearchBar extends Component {
  state = {
      input : '',
    //   band : null
      
  }

  handleSubmit = (e) => {
      e.preventDefault()
     getBandInfo(this.state.input)
     .then(bandInfo => {
        //  console.log(bandInfo.data.artist)
        //  this.setState({
        //      band : this.props.getBandInformation(bandInfo.data.artist)
        //  })
        console.log(bandInfo.data.artist, 'artist data')
        this.props.getBandInformation(bandInfo.data.artist)
         
     })
     
      
  } 

  handleChange = (e) => {
      this.setState({
          input : e.target.value
      }) 
      
         
  }

    render() {
    return (
      <div>
<form onSubmit={this.handleSubmit}>
  <label>
    Name:
    <input type="text" name="name" onChange={this.handleChange} />
  </label>
  <input type="submit" value="Submit" />
</form>


      </div>
    )
  }
}
