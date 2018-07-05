import React, { Component } from 'react'
import QuestionList from './QuestionItems'
import Cookies from 'universal-cookie';

class AnswerQuestion extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] }
    }

    componentDidMount() {
        console.log("inQuestions")
        console.log(this.cookies.get('userJwtToken'))
        console.log(this.props.isAuthenticated)
        console.log("inQuestions")
        this.props.updateHeading("Questions");
            fetch('http://127.0.0.1:8000/osqaapp/answerque/', {
                method: 'GET',
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {

                    this.setState(prev => ( {list : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching new Que..")});
    }

    render(){
        console.log("TodoItemContainer");
        console.log(this.state.list)
        return <QuestionList items={this.state.list}/> ;
    }
}

export default AnswerQuestion