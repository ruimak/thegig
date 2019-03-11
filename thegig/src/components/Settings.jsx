import React, { Component } from 'react'
import {updateUser,changePassword,reauthenticate} from '../api'
import { get } from 'http';


export default class Settings extends Component {
  

    state = {
        currentPassword : '',
        newPassword : '',
        radius : '',
        newLocation : '',
        newAvatar : ''
        
    }

    
handleChange = this.handleChange.bind(this);
handleSubmit = this.handleSubmit.bind(this);



handleChange(e) {
  
    const target = e.target.value
this.setState({[e.target.name]: target})
}
  

  handleSubmit(e) {
      e.preventDefault()
      }

 


  
    render() {

      //cant get to work for some reason have a look at it rui
    //   const listOfForms = [['radius','Enter new Radius','Change radius'],['newLocation','Enter new Location','Change Location'],['newAvatar','Enter new Avatar','Change Avatar']]
    //   console.log(listOfForms[0][2],'llllllll')
    //  const forms = (names,placeholders,texts) => {
    //    return(
    //     <form onSubmit={this.handleSubmit}>
    //     <button onClick={() => updateUser(this.props.loggedInUser,{names:this.state.names})}>{texts}</button>
    //     <input onChange={this.handleChange} type='text' name={names} placeholder={placeholders}></input>
    //     </form>
    //    )
    //  }
    return (
        
      <div>
        <form onSubmit={this.handleSubmit}>
       <button onClick={() => changePassword(this.state.currentPassword,this.state.newPassword)}>reset password</button>
       <input onChange={this.handleChange} type='text' name='currentPassword' placeholder='current password'></input>
       <input onChange={this.handleChange} type="password" name='newPassword' placeholder='new password'></input>
        </form>


        {/* {listOfForms.map((element,index) => {
           return forms(listOfForms[index][0],listOfForms[index][1],listOfForms[index][2])
        }) } */}
        
        
        <form onSubmit={this.handleSubmit}>
       <button onClick={() => updateUser(this.props.loggedInUser,{radius:this.state.radius})}>Change radius</button>
       <input onChange={this.handleChange} type='text' name='radius' placeholder='current password'></input>
       </form>

        <form onSubmit={this.handleSubmit}>
       <button onClick={() => updateUser(this.props.loggedInUser,{location:this.state.newLocation})}>Change Location</button>
       <input onChange={this.handleChange} type='text' name='newLocation' placeholder='current password'></input>
       </form>

        <form onSubmit={this.handleSubmit}>
       <button onClick={() => updateUser(this.props.loggedInUser,{avatar:this.state.newAvatar})}>Change Avatar</button>
       <input onChange={this.handleChange} type='text' name='newAvatar' placeholder='current password'></input>
       </form>

      
      </div>
    )
  }
}
