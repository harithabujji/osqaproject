import React, { Component } from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'

import './display.css';
const QuestionItem = (props) => {
    var str=props.question.tags;
    var tags=str.split(',');

    return (
       <table class="table table-striped">
  <thead>
    <tr>
          <th scope="col">Answers<br />{props.question.answercount}</th>
      <th scope="col">Votes<br />{props.question.votecount}</th>
        <th scope="col" className="clss"><br /><Link to={'/que_detail/'+props.question.id+'/'}>{props.question.title}</Link> </th>
          <p></p>
      <th scope="col">{moment(props.question.time).format("MMM Do YY")+"| "}
                Post By: {props.question.username}</th>
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

export default QuestionList