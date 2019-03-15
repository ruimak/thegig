import React, { Component } from 'react'
import {getBandInfo, getBandSuggestions} from '../api'
import {withRouter} from 'react-router-dom'

export default withRouter(class SearchBar extends Component {
  state = {
      input : '',
      suggestions:[]
    //   band : null
      
  }

  handleSubmit = (e) => {
     e && e.preventDefault()
     getBandInfo(this.state.suggestions[0])
     .then(bandInfo => {

        this.props.getBandInformation(bandInfo.data.artist)
        this.props.history.push(`/artist/${this.state.input}/news/`);
      
     })  
  } 

  handleChange = (e) => {
    const text = e.target.value
this.setState({input : text})
    text.length !==0 ? getBandSuggestions(text).then(result=>{
      const parsedSuggestions = result.data.results.artistmatches.artist.slice(0,5).map(entry=>entry.name)

      this.setState({
          suggestions: parsedSuggestions
      })

      return result}) : this.setState({
        input : text,
        suggestions: []
    })
    
      
     
         
  } 
  suggestionSelected=(value) => {

     this.setState({
          input: value, 
          suggestions: []
        })
this.handleSubmit()
        
      }

  renderSuggestions = ()=>{
    const suggestions = this.state.suggestions
    if (suggestions.length === 0 || this.state.input === 0) {
      return null
    }
    return  <ul>
    {suggestions.map(suggestion => <li onClick={()=>{this.suggestionSelected(suggestion)}}>{suggestion}</li>)}
  </ul>
  }

    render() {
      const {input}= this.state
    return (
      <div>

<form onSubmit={this.handleSubmit}>
        <label>
          Search for an artist or band:
         <input value={this.state.input} name="name" onChange={this.handleChange}   />
   {
     this.renderSuggestions()
     }
        </label>
        <input type="submit" value="Submit" />
      </form>

    
 


      </div>
    )
  }
}
)