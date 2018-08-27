import React, { Component } from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'

import './display.css';
const QuestionItem = (props) => {
    var str=props.question.tags;
    var tags=str.split(',');
    return (
   <div className="mb">
   <div className="container">
   <div className="border-header">
   <table className="tableh" >
        <tr>
        <td style={{width:"15%" , align:"right"}}>{props.question.votecount}<br/> Votes</td>
        <td style={{width:"15%" , align:"right"}}>{props.question.answercount}<br/>Answers</td>
        <td style={{width:"15%" , align:"right"}}>{props.question.viewcount}<br/> Views</td>
           <td class="col-md-6">
                  <div id="wrap-post" style={{color:"blue"}} ><Link to={'/que_detail/'+props.question.id+'/'}>{props.question.title}</Link></div></td>
                  <br/>
                <div id="author" style={{float:'right', display:'block'}}>
                 <p>{moment(props.question.time).format("MMM Do YY")+"| "}
                Post By: {props.question.username}</p>
                </div>
                 <div className="tags t-wordpress t-wordpress-theming t-custom-post-type">
        {

            <QuestionTags tags={tags} />

        }
         </div>
 </tr>

                </table>
   </div>
   </div>
   </div>

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
                <TableHead items={['Title','','Description','','Tags','','User','','Views','','Votes','','Time']}/>
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