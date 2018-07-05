import React, { Component } from 'react'
import { Link } from "react-router-dom"

const TagItem = (props) => {
    return (
        <tr>
            <td><Link to={'/tag/'+props.tag.name+'/'}>{props.tag.name}</Link></td>
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


const TagList = (props) => {
    console.log("list " + props.items)
    return (
            <div className={"container"}>
                <table className={"table table-hover"}>
                <TableHead items={['Question']}/>
                <tbody>
                {props.items.map((tag) =>
                 <TagItem tag={tag} key={tag.name}/>
                )}
                </tbody>
                </table>
            </div>
    );
}

export default TagList