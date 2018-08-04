import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { DeletePost, AddLike, RemoveLike } from "../../actions/postActions";

class PostItem extends Component {
  onDelete(postId) {
    this.props.DeletePost(postId);
  }
  onLike(postId) {
    this.props.AddLike(postId);
  }
  onUnlike(postId) {
    this.props.RemoveLike(postId);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={"/profile/" + post.user.handle}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  onClick={this.onLike.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={this.onUnlike.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={"/post/" + post._id} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.onDelete.bind(this, post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  DeletePost: PropTypes.func.isRequired,
  AddLike: PropTypes.func.isRequired,
  RemoveLike: PropTypes.func.isRequired
};
PostItem.defaultProps = {
  showActions: true
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { DeletePost, AddLike, RemoveLike }
)(PostItem);
