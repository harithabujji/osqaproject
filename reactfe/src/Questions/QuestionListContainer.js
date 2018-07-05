import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const QuestionItem = (props) => {
    return (
        <tr>
            <td>{props.question.question.title}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.question.description}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.question.tags}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.question.username}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.question.viewcount}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.question.votecount}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td> <button><Link to={'/comments/'+props.question.question.id}>Comment</Link></button></td>
        </tr>
    );
}

const TableHead = (props) => {
    return (
        <thead>
        <tr>
            {props.items.map((fieldName,index)=> (<th key={index}>{fieldName}</th>))}

        </tr>
        </thead>
    )
}


const QuestionList = (props) => {
    console.log("list " + props.items)
    return (
            <div className={"container"}>
                <table className={"table table-hover"}>
                <TableHead items={['Title','','Description','','Tags','','User','','Views','','Votes']}/>
                <tbody>
                {props.items.map((question) =>
                <QuestionItem question={question} key={question.id}/>
                )}
                </tbody>
                </table>
            </div>
    );
}

class QuestionListContainer extends Component{

    cookies = new Cookies();
    constructor(props) {
        super(props);
        this.state = { list: [] }
    }

    componentDidMount() {
     console.log("QuestionItemContainer");
        this.props.updateHeading('All Questions');
        fetch('http://127.0.0.1:8000/osqaapp/tag_detail/'+ this.props.match.params.name + '/', {
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

    render(){
        console.log("QuestionItemContainer");
        console.log(this.state.list)

        return <QuestionList items={this.state.list}/>;
    }
}

export default QuestionListContainer