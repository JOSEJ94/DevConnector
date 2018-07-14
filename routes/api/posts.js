const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests posts router
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get a single post
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) res.status(404).json({ post: "Post not found" });
      res.json(post);
    })
    .catch(err => res.status(404).json({ nopostfound: "Post not found" }));
});

// @route   POST api/posts
// @desc    Creates a new post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/posts/:id
// @desc    Deletes a post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            //Check for post owner
            if (post.user.toString() !== req.user.id) {
              res.status(401).json({
                notauthorized: "You have no permission to delete this post"
              });
            }
            //Delete
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err =>
                res.status(404).json({ postnotfound: "Post not found" })
              );
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "Post not found" })
          );
      })
      .catch(err =>
        res.status(404).json({ profilenotfound: "Profile not found" })
      );
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            )
              return res
                .status(400)
                .json({ alreadyliked: "User already liked this post" });
            post.likes.unshift({ user: req.user.id });
            post
              .save()
              .then(post => res.json(post))
              .catch(err => res.status(404).json(err));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "Post not found" })
          );
      })
      .catch(err =>
        res.status(404).json({ profilenotfound: "Profile not found" })
      );
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            )
              return res
                .status(400)
                .json({ noliked: "User has not liked this post" });
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post
              .save()
              .then(post => res.json(post))
              .catch(err => res.status(404).json(err));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "Post not found" })
          );
      })
      .catch(err =>
        res.status(404).json({ profilenotfound: "Profile not found" })
      );
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add a comment to a post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //add to comments array
        post.comments.unshift(newComment);
        //Save
        post
          .save()
          .then(post => res.json(post))
          .catch(err =>
            json.status(404).json({ postnotfound: "Post was not found" })
          );
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "Post was not found" })
      );
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment from a post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        )
          return res
            .status(404)
            .json({ commentnotexist: "Comment does not exist" });
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        //Save
        post
          .save()
          .then(post => res.json(post))
          .catch(err =>
            json.status(404).json({ postnotfound: "Post was not found" })
          );
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "Post was not found" })
      );
  }
);

module.exports = router;
