import React, { Component } from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'

import './display.css';
const AnswerItem = (props) => {

    return (
   <div>

   <table >

    <tr><td>{props.answer.text}</td></tr>
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

const AnswerList = (props) => {
    console.log("list " + props.items)
    return (
            <div className={"container"}>
                <table className={"table table-hover"}>
                 <h2><b>Answers</b></h2>
                <tbody>
                {props.items.map((answer) =>
                <AnswerItem answer={answer} key={answer.id}/>
                )}
                </tbody>
                </table>
            </div>
    );
}

export default AnswerList