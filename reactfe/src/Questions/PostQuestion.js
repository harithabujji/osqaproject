import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'
import renderHTML from 'react-render-html';

class PostQuestion extends Component {
   cookies = new Cookies();
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      body: '',
      tag:''

    };

  }

  onHandleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/osqaapp/api/v2/que/', {
            method: 'post',
             headers: {
              'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
              'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
            body: JSON.stringify({
              "title":this.state.title,
              "description":this.state.body,
              "tags":this.state.tag
             })
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            console.log("my"+myJson.id);
                this.props.history.push('/');
                console.log("Redirecting....");
        })
        .catch(e => {console.log("Error occured in fetching students.."+e)});
    this.setState({
      title: '',
      body: '',
      tag:''
    });
  }

  render() {
    return (
      <div>
      <div className="container">
        <form onSubmit={(e) => this.onHandleSubmit(e)}>
        <h2><b>Add a Post</b></h2>
        <hr/>
          <div className="form-group">
          <h5>Title:</h5>
           <input className="form-control" value={this.state.title} type="text" name="title" placeholder="Title"
              onChange={e => {this.setState({ title: e.target.value });  }}  ref="title"  />
          </div>

          <div className="form-group">
           <h5>Please enter a descriptive title for your question</h5>
            <input className="form-control" type="textarea" placeholder="Description" onChange={e => {
                this.setState({ body: e.target.value });
              }}/>
          </div>

          <div className="form-group">
          <h5 >Tags:</h5>
            <input className="form-control" type="text" placeholder="Tag" onChange={e => {
                this.setState({ tag: e.target.value }); }}/>
            <p className="desc-title">Tags are short keywords,with no spaces within<br /> Multiple tags are separated by commas.</p>
          </div>

          <div className="form-button">
          <button className="submit">Post</button>
          </div>

        </form>
        <br />

      </div>

      </div>

    );
  }
}

export default withRouter(PostQuestion);
