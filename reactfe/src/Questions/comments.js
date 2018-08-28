import React, { Component } from 'react'
import CommentList from './commentItems'
import Cookies from 'universal-cookie';

class Commentsque extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] }
    }

    componentDidMount() {
        console.log("inComments")
        console.log(this.cookies.get('userJwtToken'))
        console.log(this.props.isAuthenticated)
        console.log("inComments")

            fetch('http://127.0.0.1:8000/osqaapp/commentsque/'+this.props.idque+'/', {
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
        return <CommentList items={this.state.list}/> ;
    }
}

export default Commentsque