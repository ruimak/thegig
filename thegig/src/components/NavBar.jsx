
import React, {Component} from 'react'
import '../NavBar.css'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    bandTabs = [["news", 'News'],["albums", "Discography"],["info", "Band Info"],["events", 'Events'],["setlists", 'Setlists']]
   defaultTabs= [["news", "DefaultNews"], ["myBands", "My Bands"], ["myEvents", "My Events"], ["topCharts", "Top Charts"]]

    render() {
  return (

    <div >
      
      {this.props.bandName ? this.bandTabs.map(tab=>{
          return <div> 
              <Link to={`/${this.props.bandName}/${tab[0]}/`} className='NavBar'>
                  {tab[1]} 
                </Link>
          </div>}) 
          : 
          this.defaultTabs.map(tab=>{
            return <div> 
                <Link to={`/${tab[0]}/`} className='NavBar'>
                    {tab[1]} 
                  </Link>
            </div>}) 
          
          } 
      
   
    </div>
  )
    }
}



export default NavBar


