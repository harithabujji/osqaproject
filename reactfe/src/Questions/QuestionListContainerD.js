import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import Answersque from './Answers'
import NewQuestion from './NewQuestion'
const QuestionItem = (props) => {
    return (
        <tr>

            <td>{props.items.description}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>

            </td>
            <td> <button  type="button" class="btn btn-pill btn-info"><Link to={'/comments/'+props.items.id}>Comment</Link></button></td>

        </tr>
    );
}


class QuestionListContainerD extends Component{

    cookies = new Cookies();
    constructor(props) {
        super(props);
        this.state = { list: [], text: '',
      comments: {}}
    }

    componentDidMount() {
     console.log("QuestionItemContainer");
        this.props.updateHeading('All Questions');
        fetch('http://127.0.0.1:8000/osqaapp/que_detail/'+ this.props.match.params.id + '/', {
            method: 'get',
            })
            .then(function(response) {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                this.setState(prev => ( {list : myJson}));
            })
            .catch(e => {console.log("Error occured in fetching Questions..")});
    }

    onHandleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/osqaapp/answers/'+ this.props.match.params.id + '/', {
            method: 'post',
             headers: {
              'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
              'Content-Type': 'application/json'
           },
            body: JSON.stringify({
              "text":this.state.text,

             })
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            console.log("my"+myJson.id);
                this.props.history.push('/');
                console.log("Redirecting....");
        })
        .catch(e => {console.log("Error occured in fetching students.."+e)});
    this.setState({
      text: '',
    });
  }

    render(){
        console.log("QuestionItemContainer");
        console.log(this.state.list)

        return (
        <div>
        <QuestionItem items={this.state.list}/>


         <Answersque idque={this.props.match.params.id}/>

        <div className="container">
        <form onSubmit={(e) => this.onHandleSubmit(e)}>
        <h2><b>Your Answer</b></h2>
        <hr/>
          <div className="form-group">
          <h1 className="titles">Answer:</h1>
           <input className="form-control" value={this.state.text} type="textarea" name="comment" placeholder="Enter your answer here"
              onChange={e => {this.setState({ text: e.target.value });  }}  ref="text"  />
          </div>
          <div className="form-button">
          <button className="submit">Submit</button>
          </div>
           </form>
        <br />
         </div>



      </div>
        );
    }
}

export default QuestionListContainerD