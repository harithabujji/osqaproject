import React, { Component } from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'

import './display.css';
const CommentItem = (props) => {

    return (
   <div>

   <table >

    <tr><td>{props.comment.text}</td></tr>
    </table>
  <br/>
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

const CommentList = (props) => {
    console.log("list " + props.items)
    return (
            <div className={"container"}>
                <table className={"table table-hover"}>
                 <h2><b>Comments</b></h2>
                <tbody>
                {props.items.map((comment) =>
                <CommentItem comment={comment} key={comment.id}/>
                )}
                </tbody>
                </table>
            </div>
    );
}

export default CommentList