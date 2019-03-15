
import React, {Component} from 'react'
import '../NavBar.css'
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
   const navBarComponent = <div >
      {this.props.params ? this.props.tabs.map(tab=>{
          return <div> 
              <Link to={`/artist/${this.props.params.band}/${tab[0]}/`} className='NavBar'>
                  {tab[1]} 
                </Link>
          </div>}) 
          : 
          this.props.tabs.map(tab=>{
            return <div> 
                <Link to={`/${tab[0]}`} className='NavBar'>
                    {tab[1]} 
                  </Link>
            </div>}) 
          
          } 
      
   
    </div>
  return (
    <div>{navBarComponent}   </div>

  )
    }
}



export default NavBar


