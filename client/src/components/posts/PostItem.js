import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from  '../../actions/postActions';

class PostItem extends Component {

    handleOnLikeClick(id){
        this.props.addLike(id);
    }

    handleOnUnlikeClick(id){
        this.props.removeLike(id);
    }

    handleDeleteClick(id){
        this.props.deletePost(id);
    }

    findUserLike(likes){
        const { auth } = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true;
        }
        else {
            return false;
        }
    }

  render() {
      const { post, auth } = this.props;
     
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    
                    <img className="rounded-circle d-none d-md-block" src={post.gravatar}
                        alt={post.name} />
                    
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    <button type="button" className="btn btn-light mr-1" onClick={this.handleOnLikeClick.bind(this,post._id)}>
                    <i className={classnames('fas fa-thumbs-up', {'text-info' : this.findUserLike(post.likes)})}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button type="button" className="btn btn-light mr-1" onClick={this.handleOnUnlikeClick.bind(this,post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                    <span className="badge badge-light"></span>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                    </Link>
                    {post.user === auth.user.id ? (<button className="btn btn-danger mr-1" type="button" onClick={this.handleDeleteClick.bind(this, post._id)}><i className="fas fa-times"/></button>)
                        : null}
                </div>
            </div>
        </div>
    )
  }
}

PostItem.propTypes = {
    addLike : PropTypes.func.isRequired,
    removeLike : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth,

});


export default connect(mapStateToProps, { deletePost, addLike, removeLike})(PostItem);
