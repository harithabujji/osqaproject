import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router'
import '../App.css';

class Login extends Component{
    cookies = new Cookies();
    state = {
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        buttonName : 'Login',
        username : "" ,
        password: ""
    }

    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    submit = (e) => {
        e.preventDefault();
        // const {username, password} = this.state
        this.login(this.state)

    }
      signsubmit = (e) => {

         window.location.href = "http://127.0.0.1:8000/signup";
    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        console.log(this.cookies.get('userJwtToken'));
        this.props.updateUsername('');
        this.props.updateStatus(false);
        this.setState(prev => ( {buttonName : 'Login'}));
    }
    login = ({username, password}) =>
    {
        console.log(username + " : "+password);
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(this.state.jwt_url, {
            method: 'post',
            body: formData,
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            if ('token' in myJson){
                var days = 15;
                  var date = new Date();
                  var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(res)} );
                  this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(res)})
                  console.log(this.cookies.get('userJwtToken').token);
                  this.props.updateUsername(formData.get('username'));

                this.setState(prev => ( {buttonName : 'Logout'}));

               this.props.history.push('/');

            }
            else{
                alert("Invalid Credentials");
            }
        })
        .catch(e => {console.log("Error occured in fetching students..")});
    }

    render(){
        return (
         <div className="containers">
           <form onSubmit={(e) => this.onHandleSubmit(e)}>
              <div className="forms">
                   <div className="form-group1">
                  <span className="titles1">User Name</span>
                   <input onChange={this.saveUsername} type="text" placeholder="Enter username"/><br/>
                    </div>

                   <div className="form-group1">
                   <span className="titles1">Password</span>
                   <input onChange={this.savePassword} type="password" placeholder="Enter Password"/><br/>
                  </div>

              <div className="form-group2">
               <button onClick={this.submit} className={"btn btn-primary btn-sm"} value="Login">Login</button>
               </div>


              <div className="form-group2">
                <button onClick={this.signsubmit} className={"btn btn-primary btn-sm"} value="SignUp">SignUp</button>
                </div>

            </div>
        </form>
        </div>

        )
    }
}

export default withRouter(Login)