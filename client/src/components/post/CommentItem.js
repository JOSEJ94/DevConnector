import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDelete(postId, commentId) {
    this.props.DeleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={"/profile/" + comment.user.handle}>
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDelete.bind(this, postId, comment._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  DeleteComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { DeleteComment }
)(CommentItem);
