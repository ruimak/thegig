import React, { Component } from 'react'
import {getBillboardCharts} from '../../api'
import { Link } from 'react-router-dom';

export default class Billboards extends Component {
    state = {
        charts:[]
    }

    componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(keyWord) {
       getBillboardCharts(keyWord).then(tracks=>{
            this.setState({charts : tracks.data})
        })
}
   
  render() {
        const listOfButtons = [['Hot100', 'hot-100'], ['RnB', 'rnb'], ['Top UK', 'uksongs'], ['Top Rock', 'rock'], ['Top Pop', 'pop'] ]
const chartButton = (name, keyWord) => {
    return <div>
        <button name={name} onClick={()=>this.handleClick(keyWord)}>
        {name}
        </button> 
       
        </div>
}

    return (
      <div>
             {listOfButtons.map((element, index)=>{
                 return chartButton(listOfButtons[index][0], listOfButtons[index][1])
             }) }
              {this.state.charts !== null ?
        <div>
        {this.state.charts.map(track => {     
                 return  <Link to={`/${track.artist}/song/${track.title}`}><div>  {`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
            </Link> })}  </div> 
             : 
             null}
      </div>
    )
  }
}
