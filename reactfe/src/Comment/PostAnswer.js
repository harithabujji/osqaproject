import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'
import renderHTML from 'react-render-html';

class PostComment extends Component {
   cookies = new Cookies();
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      comments: {}
    };

  }

  onHandleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/osqaapp/answers/'+ this.props.match.params.pk + '/', {
            method: 'post',
             headers: {
              'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
              'Content-Type': 'application/json'
           },
            body: JSON.stringify({
              "text":this.state.text,

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
      text: '',
    });
  }

  render() {
    return (
      <div>
      <div className="container">
        <form onSubmit={(e) => this.onHandleSubmit(e)}>
        <h2><b>Give a Comment</b></h2>
        <hr/>
          <div className="form-group">
          <p className="titles">comment:</p>
           <input className="form-control" value={this.state.text} type="textarea" name="comment" placeholder="Comment"
              onChange={e => {this.setState({ text: e.target.value });  }}  ref="text"  />
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

export default withRouter(PostComment);
