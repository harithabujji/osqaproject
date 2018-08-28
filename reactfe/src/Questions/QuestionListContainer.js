import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import moment from 'moment'

const QuestionItem = (props) => {
 var str=props.question.question.tags;
    var tags=str.split(',');
    return (
       <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Answers<br />{props.question.question.answercount}</th>
      <th scope="col">Votes<br />{props.question.question.votecount}</th>
        <th scope="col" className="clss"><br /><Link to={'/que_detail/'+props.question.question.id+'/'}>{props.question.question.title}</Link> </th>
          <p></p>
      <th scope="col">{moment(props.question.question.time).format("MMM Do YY")+"| "}
                Post By: {props.question.question.username}</th>
    </tr>
    <tr className="tags-alignf">   <div className="tags t-wordpress t-wordpress-theming t-custom-post-type">
        { <QuestionTags tags={tags} /> }
         </div>
         </tr>
  </thead>
          </table>
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


const QuestionTags =({tags})=>{
    return(
        <div>
                {
                    tags.map(function(name, index){
                    return <div className="post-tag" title="show questions tagged 'wordpress'" rel="tag">{name}</div>;
                  })
                }
        </div>
    );
}
const QuestionList = (props) => {
    console.log("list " + props.items)
    return (
            <div className={"container"}>
                <table className={"table table-hover"}>

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