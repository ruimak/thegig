import React, { Component } from "react";
import { login } from "../../api";

export default class SignIn extends Component {
    state = {
        email:'',
        password:''
    };

    componentDidMount() {this.handleSubmit = this.handleSubmit.bind(this)
       
       }
     
    handleSubmit(e) {
      e.preventDefault()  
      return login(this.state.email, this.state.password)
     }
  
  
    handleChange = (e) => {

      this.setState({
          [e.target.name] : e.target.value
      }) 

     
      
         
  }
  
    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
      <label>
    email:
    <input type="text" name="email" onChange={this.handleChange}/>
  </label>
  <label>
    password:
    <input type="text" name="password" onChange={this.handleChange} />
  </label>
  <input type="submit" value="Submit" />
</form>
        </div>
      );
    }
  }