import React, { Component } from 'react'
import Cookies from 'universal-cookie';
//import {Redirect} from 'react-router-dom'
import './Header.css';
import {withRouter} from "react-router-dom";
import PostQuestion from '../Questions/PostQuestion'


import TagListContainer from '../tag/TagContainer'
import QuestionListContainer from '../Questions/QuestionListContainer'

import Login from '../Authentication/login'


import {BrowserRouter as Router,Redirect,Link,Switch,Route} from 'react-router-dom'


export class Header extends Component{

    cookies = new Cookies();

    state = {
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        buttonName : 'Login'

    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        console.log(this.cookies.get('userJwtToken'));
        // console.log(formData.get('username'))
        this.props.updateUsername('');
        this.props.updateStatus(false);
        this.setState(prev => ( {buttonName : 'Login'}));
    }
    login = (props) =>
    {

     window.location.href = "http://127.0.0.1:8000/login";
//    <Redirect to={{ pathname: '/login', state: { from: this.props.location }}} />
    }

    render(){
        return (
        <Router>
        <div>

               <h1 className={"App-name"}>{this.props.title} </h1>
           <div>

                   <ul className="header-ul">

                                <li>
                                     <p className={"App-user"}>
                        <label className={"username"}>
                        { this.props.isAuthenticated ? "Welcome," + this.props.username : "Explore my World by"}</label><br/>
                        <button className={"btn btn-primary login-button"}
                             onClick={
                                    this.props.isAuthenticated?
                                    this.logout : this.login
                                }
                             >
                            { this.props.isAuthenticated? "Logout" : "Login"}
                        </button>
                        </p>
                                </li>


                                <li className="header-li">
                                    <Link className="headerlinks" to="/about">About</Link>
                                </li>

                                <li className="header-li">
                                    <Link className="headerlinks" to="/faq">FAQ</Link>
                                </li>

                            </ul>

                    </div>

                    <div>
                        <Switch>
                            <Route exact path="/login" render={(props) =>
                                <Login
                                    isAuthenticated={this.props.isAuthenticated}
                                    username={this.props.username}
                                    updateUsername={this.props.updateUsername}
                                    updateStatus={this.props.updateLoginStatus}

                                    />


                                }/>

                            <Route path="/faq" component={Home} />

                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}


const Home = () => (
    <div>
    <p>
     always
      matches.
<PostQuestion/>
    </p>
    </div>
  );
export default Header;

