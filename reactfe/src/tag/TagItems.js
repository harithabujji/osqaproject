import React, { Component } from 'react'
import { Link } from "react-router-dom"

const TagItem = (props) => {
    return (


    <div class="grid-item"><Link to={'/tag/'+props.tag.name+'/'}>{props.tag.name}</Link></div>


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
                <TableHead items={['Tags']}/>
                <tbody>
                 <div class="grid-container">
                {props.items.map((tag) =>
                 <TagItem tag={tag} key={tag.name}/>
                )}
                </div>
                </tbody>
                </table>
            </div>
    );
}

export default TagList