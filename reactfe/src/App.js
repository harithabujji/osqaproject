import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


import TagListContainer from './tag/TagContainer'
import QuestionListContainer from './Questions/QuestionListContainer'
import QuestionListContainerD from './Questions/QuestionListContainerD'
import NewQuestion from './Questions/NewQuestion'
import PostQuestion from './Questions/PostQuestion'
import PostComment from './Comment/PostComment'
import PostAnswer from './Comment/PostAnswer'
import ViewQuestion from './Questions/ViewQuestion'
import AnswerQuestion from './Questions/AnswerQuestion'
import Answersque from './Questions/Answers'

import UnAnswerQuestion from './Questions/UnanswerQuestion'
import VoteQuestion from './Questions/VoteQuestion'
import  SignUp from './Authentication/signup'
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

  render() {
    this.state.isAuthenticated=(this.cookies.get('username') && this.cookies.get('username')!='')?true:false;
    this.state.username=this.cookies.get('username');
    console.log(this.state.username);
    console.log(this.state.isAuthenticated);
    return (
    <div>

      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light App-header">

        <Header title="OSQA App"
            isAuthenticated={this.state.isAuthenticated}
            username={this.state.username}
            updateUsername={this.updateUsername}
            updateStatus={this.updateLoginStatus} />


</nav>

         </div>
      <React.Fragment>
            <Router>
                <div>
                <br/>
                <center>
                <table>
                <tr>

                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>

                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                   <td> <button class="btn btn-outline-primary"><Link to={'/view'}>Featured</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                   <td> <button class="btn btn-outline-primary"><Link to={'/vote'}>Interesting</Link></button></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><button class="btn btn-outline-primary"><Link to={'/answer'}>Hot</Link></button></td>
                     <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                     <td><button class="btn btn-outline-primary"><Link to={'/post'}>Ask Question</Link></button></td>
                    </tr>
                    </table>

                    </center>

                   <div className="side">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABI1BMVEX///93APz///3///zn5+f7+/v///r///j///d3APv//f////V3AP/9//////L9//16APhxAP9qAPn/+////+98APZuAPV8APt2APFoAPpoAPT/9//6//hyAPT7//NwAO///+nTtvrYwfXSqvnezPLWvPp5AO376vPHofjy3f+CJPOZWffiyv2jafJiAPf1//udY/O2jfiKN/qDPe/Ip+nw4v327e+mfPKeYPyKPP/AkuxvAOb77v+ISffdw+2XWP+qevS8hv97JPzEn/mFK+iiZebIsvKyi/yhYvm4kfCkc/XVovH24/R7LPWEQOyINPO3iuni2vrJrf+JKuvy2f/u7fqPNOHi2+/cyuGVTt/86PyzguqfSPqufvvhvv+hbv6FS/ApX3KVAAAWXUlEQVR4nO1cCVvbuLq25Itk2ZItO/EaKyGQBAIJawNdQqHQMwUGStuBO3OgC///V1zZYCfQtCVhOpPex2+fYSBOFL3St3+yFaVAgQIFChQoUKBAgQIFChQoUKBAgQIFChQoUKBAgQIFChQoUKBAgQIFChQoUKBAgSkChPDfnsLPBVRV9f85xQK/Fhhj8qeuJ79qlfPmh8XFg4ODxfpcu2IoiqUq8gqy2L89zUdANTC0DLNa/uuoC6KVMHJs23aEE66s8MPFTsXABkz5/7rQVy3Un39qhzb1fUIo8AGllHDfB8BeEV/qFxAZ6r89y0cAGniu64WtQLITnNwAAEJ4kPzz7RAcN0q/pGllCGq6BSvzbyNJhxIhqCt/yF2kgPicA0JJsqmA2+F1XTdKEOn43570WNAsZplobmOF8gAA4BFAA0GA8Pc3Nva5s+LxIJCbmWwnEN5mHVnW7K+ljyqb1c6vI7ldKY/ApyH48uF9v4JMY6a00DnoBqHNE4ZcKietLZ9o7NdSR8TgVUSl5lGe8LC9tTmkqpYRy81SIVON8szcco0CaXc48F1OxAFE//akHw6MFGNhw0k2D3Ducjva6+ER5uRiDbTkHoJkm337egHjX0QVpQ7CudAjqZZRatc+NrCGvtIyqEKtsSHl2E71Edi1jmL9GmYVWbMHjvCDG4aO985CMWP3twdKV6IjfVvKcsLQdgF36savYG2woppvokQBpf0kPqg1oWFZ+Cslky8w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" height="100" width="100"></img>
                   <table>
                   <tr>
                   <td><h5><Link to={'/tag'}>Tags</Link></h5></td>
                   </tr>
                   <tr>
                    <td><h5><Link to={'/new'}>Questions</Link></h5></td>
                   </tr>
                    <tr>
                   <td><h5><Link to={'/unanswer'}>Unanswered</Link></h5></td>
                   </tr>
                   </table>
                   </div>


                   <Route path="/signup" component={SignUp} />
                    <Route exact path="/tag" render={(props) => <TagListContainer
                             isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle}/> }/>
                    <Route exact path="/tag/:name" render={(props) =>
                    <QuestionListContainer {...props} updateHeading={this.updateTitle} />}/>



                    <Route exact path="/que_detail/:id" render={(props) =>
                    <QuestionListContainerD {...props} updateHeading={this.updateTitle} />}/>

                    <Route exact path="/new" render={(props) =>
                    <NewQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/view" render={(props) =>
                    <ViewQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/vote" render={(props) =>
                    <VoteQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/answer" render={(props) =>
                    <AnswerQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route exact path="/unanswer" render={(props) =>
                    <UnAnswerQuestion isAuthenticated={this.state.isAuthenticated} updateHeading={this.updateTitle} />}/>
                    <Route path="/comments/:pk" render={(props)=>
                                (this.cookies.get('username') && this.cookies.get('username')!='')?
                                    <PostComment key={this.props.tabname} tabname={this.props.tabname}/>
                                     :<Login
                                    isAuthenticated={this.props.isAuthenticated}
                                    username={this.props.username}
                                    updateUsername={this.props.updateUsername}
                                    updateStatus={this.props.updateLoginStatus}

                                    /> }/>
                       <Route path="/answers/:pk" render={(props)=>
                                (this.cookies.get('username') && this.cookies.get('username')!='')?
                                    <PostAnswer key={this.props.tabname} tabname={this.props.tabname}/>
                                     :<Login
                                    isAuthenticated={this.props.isAuthenticated}
                                    username={this.props.username}
                                    updateUsername={this.props.updateUsername}
                                    updateStatus={this.props.updateLoginStatus}

                                    /> } />
                    <Route path="/post" component={PostQuestion} />
                 <Route path="/answersforque" component={Answersque} />
                </div>
            </Router>
        </React.Fragment>
      </div>
    );
  }
}


export default App;
