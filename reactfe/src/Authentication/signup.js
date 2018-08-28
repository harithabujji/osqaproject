import React, { Component } from 'react';
import {BrowserRouter as Router,Redirect,Link,Switch,Route} from 'react-router-dom'
import './signup.css';

import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'

  class SignUp extends Component {
    cookies = new Cookies();
    constructor(props, context) {
    super(props, context);
    this.state = {

          firstname : "" ,
          lastname : "",
          password: "",
          emailid : "",
          username:""
          };
      }


 onHandleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/rest-auth/registration/', {
            method: 'post',
             headers: {
              'Content-Type': 'application/json'
           },
            body: JSON.stringify({
              "username":this.state.username,
              "password1":this.state.password,
              "password2":this.state.password,

             })
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            var days = 7;
                var date = new Date();
                var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

                this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(res)} );
                this.cookies.set('username',this.state.username, {path : '/', expires: new Date(res)})
                console.log(this.cookies.get('userJwtToken').token);

                this.props.history.push('/');

                console.log("Redirecting....")
                 window.location.href = "http://127.0.0.1:8000";

        })
        .catch(e => {console.log("Error occured in fetching students.."+e)});
    this.setState({
      username: '',
      password: '',
      email:'',
      firstname:'',
      lastname:''
    });
  }





    render() {
      return (
          <div className="containers">
           <form onSubmit={(e) => this.onHandleSubmit(e)}>
              <div className="forms">

              <div className="form-group1">

              <span className="titles1">First Name:</span>
                 <input   type="text" placeholder="Enter FirstName" name="uname" onChange={e => {this.setState({ firstname: e.target.value });  }}/>
                  </div>
                   <div className="form-group1">
                   <span className="titles1">Last Name:</span>
                 <input  type="text" placeholder="Enter Lastname" name="uname"  onChange={e => {
                this.setState({ lastname: e.target.value }); }}/>
              </div>
              <div className="form-group1">
                 <span className="titles1">User Name:</span>
                 <input  type="text" placeholder="Enter Username" name="uname" onChange={e => {
                this.setState({ username: e.target.value }); }}/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Email Id:</span>
                 <input  type="text" placeholder="Enter Email-Id" name="uname" onChange={e => {
                this.setState({ emailid: e.target.value }); }}/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Password:</span>
                 <input   type="text" placeholder="Enter Password" name="uname" onChange={e => {
                this.setState({ password: e.target.value }); }}/>
              </div>
              <div className="form-group2">
                    <button className="submit">Sign Up</button>
              </div>

            </div>
        </form>
        </div>
      );
    }
  }

  export default withRouter(SignUp);