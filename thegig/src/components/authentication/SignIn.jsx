import React, { Component } from "react";
import { createUser } from "../../api";


export default class SignIn extends Component {
  state = {
    fName:'',
      lName:'',
      email:'',
      password:'',
      avatar:
        ''
  };

  componentDidMount() {this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()  
    if (!/^[a-zA-Z]+$/.test(this.state.fName)) {
    return alert('Please insert a valid first name');
  } if (!/^[a-zA-Z]+$/.test(this.state.lName)) {
    return alert('Please insert a valid last name');
  } if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email,
    )
  ) {
    return alert('Please insert a valid email address');
  } if (this.state.password.length < 6) {
    return alert('Password must have 6 characters or more');
  }
  return createUser(this.state.fName, this.state.lName, this.state.email, this.state.password).then((data) => {
    if (data) {
      alert('Account created!');
    //   this.props.router.pop();
    }
  });}


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
    First name:
    <input type="text" name="fName" onChange={this.handleChange}/>
  </label>
  <label>
    Last name:
    <input type="text" name="lName" onChange={this.handleChange} />
  </label>
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
