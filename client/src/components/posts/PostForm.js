import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {

    state = {
        text : '',
        errors : {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    

    handleSubmit = (e) => {
        e.preventDefault();

        const { user } = this.props.auth;
        
        const newPost = {
            text : this.state.text,
            name : user.name,
            gravatar : user.gravatar
        };


        this.props.addPost(newPost);
        this.setState({
            text : ""
        })
    }


    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({
                errors : newProps.errors
            })
        }
    }

  render() {
      const { errors } = this.state;
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup 
                            className="form-control form-control-lg" 
                            placeholder="Create a post"
                            name="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            error={errors.text}
                            >
                            </TextAreaFieldGroup>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

PostForm.propTypes = {
    addPost : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
