import React, { Component } from 'react'


import getChart from 'billboard-top-100'
import {getHot100,getTopUk,getTopRock,getTopPop,getrnbtop50} from '../api'



export default class Billboards extends Component {
  
    state = {
        rnbTop50 : [],
        hot100 : [],
        TopUk:[],
        TopRock:[],
        TopPop:[]
    }
    

    componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e.target,'dddd')
        const target = e.target.name
        const event = target === 'hot100' ? getHot100().then(tracks => {
            this.setState({[target] : tracks.data})
        }) : target === 'rnbTop50' ? getrnbtop50().then(tracks => {
            this.setState({[target] : tracks.data})
        }) : target === 'TopUk' ? getTopUk().then(tracks => {
            this.setState({[target] : tracks.data})
        }) : target === 'TopRock' ? getTopRock().then(tracks => {
            this.setState({[target] : tracks.data})
        }) : target === 'TopPop' ? getTopPop().then(tracks => {
            this.setState({[target] : tracks.data})
        }) : 'hello'
}

   
  render() {
        console.log(this.state,':::::::::')
    return (
      <div>
        <button name="hot100" onClick={this.handleClick}>
         Hot 100
        </button>
        {this.state.hot100 !== null ?<div>{this.state.hot100.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> : null}
        
        
        
        
        <button name="rnbTop50" onClick={this.handleClick}>
        rnbTop50
         </button>
            {this.state.rnbTop50 !== null ?<div>{this.state.rnbTop50.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> : null}



        <button name="TopUk" onClick={this.handleClick}>
        TopUk
        </button>
        {this.state.TopUk !== null ? <div>{this.state.TopUk.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> : null}






        <button name="TopRock" onClick={this.handleClick}>
        TopRock
         </button>
        {this.state.TopRock !== null ? <div>{this.state.TopRock.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> : null}





        <button name="TopPop" onClick={this.handleClick}>
        TopPop
        </button>
        {this.state.TopPop !== null ? <div>{this.state.TopPop.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> : null}

      </div>
    )
  }
}
