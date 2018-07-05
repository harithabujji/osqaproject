import React, { Component } from 'react'
import TagList from './TagItems'
import Cookies from 'universal-cookie';

class TagListContainer extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] }
    }

    componentDidMount() {
        console.log("intags")
        console.log(this.cookies.get('userJwtToken'))
        console.log(this.props.isAuthenticated)
        this.props.updateHeading("All Participating Tags");
//        if( this.props.isAuthenticated == true)
//        {

            fetch('http://127.0.0.1:8000/osqaapp/tag/', {
                method: 'get',
//                headers: new Headers({
//                'Authorization': 'JWT '+this.cookies.get('userJwtToken').token,
//                }),
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {

                    this.setState(prev => ( {list : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching..")});
//        }
    }

    render(){
        console.log("TodoItemContainer");
        console.log(this.state.list)
        return <TagList items={this.state.list}/> ;
    }
}

export default TagListContainer