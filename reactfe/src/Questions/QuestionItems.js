import React, { Component } from 'react'
import { Link } from "react-router-dom"

const QuestionItem = (props) => {
    return (
        <tr>
            <td>{props.question.title}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.description}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.tags}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.username}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.viewcount}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.votecount}</td> &nbsp;&nbsp;&nbsp;&nbsp;
            <td>{props.question.time}</td> &nbsp;&nbsp;&nbsp;&nbsp;
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