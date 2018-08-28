import React, { Component } from 'react'
import AnswerList from './AnswerItems'
import Cookies from 'universal-cookie';

class Answersque extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] }
    }

    componentDidMount() {
        console.log("inAnswers")
        console.log(this.cookies.get('userJwtToken'))
        console.log(this.props.isAuthenticated)
        console.log("inAnswers")

            fetch('http://127.0.0.1:8000/osqaapp/answersque/'+this.props.idque+'/', {
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
        return <AnswerList items={this.state.list}/> ;
    }
}

export default Answersque