
import React, {Component} from 'react'
import '../NavBar.css'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    info = [["info", "Band Info"],["events", 'Events'],["setlists", 'Setlists'],["news", 'News']]
   

    render() {
  return (

    <div >
      
      {
          this.info.map(tab=>{
            //   console.log(tab)
          return <div> 
              <Link to={`/${this.props.bandName}/${tab[0]}/`} className='NavBar'>
                  {tab[1]} 
                </Link>
          </div>
          
      })}
      
   
    </div>
  )
    }
}

// <Link to="/:band/info">
// {this.state.bandInfoInApp !== null ? (
//   <BandInfo bandInfo={this.state.bandInfoInApp} />
// ) : (
//   "hello"
// )}{" "}
// </Link>
// <Link to="/:band/events">
// {this.state.bandInfoInApp !== null ? (
//   <ArtistEvents bandName={this.state.bandInfoInApp.name} />
// ) : (
//   "hello"
// )}
// </Link>
// <Link to="/:band/setlists">
// {this.state.bandInfoInApp !== null ? (
//   <SetLists mbid={this.state.bandInfoInApp.mbid} />
// ) : (
//   "hello"
// )}
// </Link>
// <Link to="/:band/news">
// {this.state.bandInfoInApp !== null ? (
//   <ArtistNews bandName={this.state.bandInfoInApp.name} />
// ) : (
//   "hello"
// )}
// </Link>

export default NavBar


