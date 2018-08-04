import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { GetPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.GetPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) postContent = <Spinner />;
    else postContent = <PostFeed posts={posts} />;
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  post: PropTypes.object.isRequired,
  GetPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { GetPosts }
)(Posts);
