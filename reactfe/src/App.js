import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TagListContainer from './tag/TagContainer'
import QuestionListContainer from './Questions/QuestionListContainer'
import NewQuestion from './Questions/NewQuestion'
import PostQuestion from './Questions/PostQuestion'
import PostComment from './Comment/PostComment'
import ViewQuestion from './Questions/ViewQuestion'
import AnswerQuestion from './Questions/AnswerQuestion'
import VoteQuestion from './Questions/VoteQuestion'
import {Header,Heading} from './Header'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Login from './Authentication/login'

class App extends Component {
 state = {
    title : "Welcome",
    isAuthenticated : false,
    username:''
  }
  cookies = new Cookies();

  constructor(){
    super();
    if (this.cookies.get('userJwtToken') != '')
    {
      this.updateLoginStatus(true);
    }
  }

  updateTitle = (title) => {
    this.setState({title});
  }

  updateLoginStatus = (isAuthenticated) => {
    this.setState({isAuthenticated})
  }

  updateUsername = (username) => {
    this.setState({username})
  }

//  render() {
//    return (
//     <div>
//        <Header title="OSQA App" isAuthenticated={this.state.isAuthenticated}
//         username={this.state.username} updateUsername={this.updateUsername}
//         updateStatus={this.updateLoginStatus}/>
//        <Heading title={this.state.title}/>
//
//        <Router>
//          <Switch>
//          {/* <Router.Fragment> */}
//               <Route exact path="/p" render={(props) => this.state.isAuthenticated
//                ?
//                <TagListContainer
//                  isAuthenticated={this.state.isAuthenticated}
//                  updateHeading={this.updateTitle}
//                />
//                :
//                <Redirect to="/login"/>
//               }
//              />
//              <Route exact path="/login" render={(props) =>
//                <Login
//                isAuthenticated={this.state.isAuthenticated}
//                username={this.state.username} updateUsername={this.updateUsername}
//                updateStatus={this.updateLoginStatus}/>
//                }
//              />
//
//              <Route exact path="/tag/:name" render={(props) =>
//                 <QuestionListContainer {...props} updateHeading={this.updateTitle} />}/>
//
//                <Route exact path="/" render={(props) => this.state.isAuthenticated
//                ?
//                <PostQuestion
//                  isAuthenticated={this.state.isAuthenticated}
//                  updateHeading={this.updateTitle}
//                />
//                :
//                <Redirect to="/login"/>
//               }
//              />
//          </Switch>
//        </Router>
//
//      </div>
//
//    );
//  }
//}
  render() {
    this.state.isAuthenticated=(this.cookies.get('username') && this.cookies.get('username')!='')?true:false;
    this.state.username=this.cookies.get('username');
    console.log(this.state.username);
    console.log(this.state.isAuthenticated);
    return (
    <div>

      <div>
        <header className="App-header">
        <Header title="OSQA App"
            isAuthenticated={this.state.isAuthenticated}
            username={this.state.username}
            updateUsername={this.updateUsername}
            updateStatus={this.updateLoginStatus} />
        </header>
         </div>
      <React.Fragment>
            <Router>
                <div>
                <center>
                <table>
                <tr>
                    <td><button><Link to={'/tag'}>Tags</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                   <td> <button><Link to={'/new'}>New</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                   <td> <button><Link to={'/view'}>Most Viewed</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                   <td> <button><Link to={'/vote'}>Most Voted</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><button><Link to={'/answer'}>Most Answered</Link></button></td>
                     <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                    </table>
                    </center>

                    <Route exact path="/tag" render={(props) => <TagListContainer
                             isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle}/> }/>
                    <Route exact path="/tag/:name" render={(props) =>
                    <QuestionListContainer {...props} updateHeading={this.updateTitle} />}/>

                    <Route exact path="/new" render={(props) =>
                    <NewQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/view" render={(props) =>
                    <ViewQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/vote" render={(props) =>
                    <VoteQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/answer" render={(props) =>
                    <AnswerQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>

                    <Route path="/comments/:pk" component={PostComment} />
                    <Route path="/answers/:pk" component={PostComment} />

                </div>
            </Router>
        </React.Fragment>
      </div>
    );
  }
}


export default App;