import React, { Component } from 'react'
import { string } from 'prop-types';
import {getBandSuggestions} from '../../api'
import {artistSuggestFromGenre} from '../../api'
import firebase from "../../firebase.js";
import {addBandToFollowedList,removeBandFromFollowedList} from '../../api'

export default class ChooseGenres extends Component {
  state = {
      genresChoosen : [],
      next : false,
      ids : [],
      user : '',
      artists : ''
      
  }
  

  componentDidMount() {
    const fire = firebase.database().ref('bands/')
    fire.on('value',(snapshot) => {
console.log(snapshot,'iuhiuhgiugiuguigiu')
    })


//     firebase.auth().onAuthStateChanged(user => {
// if(user){
//     this.setState({firebaseUID:user.uid})
// }
//     })
// let userBands = firebase.ref('bands')
// console.log(userBands,'wrfrhfrehferhw')
  }
  



  onClickRock(e) {
      const value = e.target.value
      const copyOfState = this.state.ids
copyOfState.includes(value) !== true ? 
this.setState({ids : [...copyOfState,value]
                      }) :
this.setState({ids : copyOfState.filter(genre =>  genre !== value
),rockId : ''} )
  }



  onClickPop(e) {
const value = e.target.value
const copyOfState = this.state.ids
copyOfState.includes(value) !== true ? 
this.setState({ids : [...copyOfState,value]
                }) :
this.setState({ids : copyOfState.filter(genre =>  genre !== value
),rockId : ''} )

  }
  
  
  
  
  
  handleClick() {
      this.setState({next : true})
  }


  
  addOrDeleteArtists(e) {
      const value = e.target.value
      
      
      this.props.bands.includes(value) !== true ? 
      addBandToFollowedList(this.props.firebase,value) :
      removeBandFromFollowedList(this.props.firebase,value)

      




  }
   
    
  
      render() {
        console.log(this.props,'heloooooooooooooo stateeeeee')
        console.log(this.state.artists,'hhhhhhhhhhhhhhhhh')
    return (
        this.state.next !== true ?
      <div>
        <h1>Choose your favitoe genres></h1>
        <button onClick={() =>this.handleClick()}>next</button>
        <button value= 'Arianna-Grande katy-perry little-mix Taylor-Swift Rhianna' onClick={(e) => this.onClickPop(e)}>pop</button>
        <button value='kings-of-leon artic-monkeys ' onClick={(e) => this.onClickRock(e)}>rock</button>
        
      </div> : 
      <div>
          <div>{this.state.ids.join(' ').split(' ').filter(value => value !== '').map(artist => {
              console.log(artist,'hkgkugfkufkfkuf lollololololol')
              return <button value={artist} onClick={(e) =>this.addOrDeleteArtists(e)}>{artist}</button>
          })}</div>
      </div>
        
    )
  }
}
