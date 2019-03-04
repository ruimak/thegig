
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



export default NavBar


