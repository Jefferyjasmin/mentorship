const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

///Bring in table / Schema/ model
const Post = require("../../models/Post");
///Bring in table / Schema/ model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");
// @route    Get api/post/test
// @desc     test post route
// @access   public
router.get("/test", (req, res) => res.json({ meg: " posts works" }));

// @route    Post api/post
// @desc     Create post route
// @access   private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // If any errors, send 400 with errors objects
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

// @route    Get api/post
// @desc     get posts route
// @access   public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch(() =>
      res.status(404).json({ nopostfound: "No post founds with that id" })
    );
});

// @route    Get api/post/:id
// @desc     get post by id
// @access   public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch(() =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

// @route    Delete api/post/:id
// @desc     Delete post by id
// @access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "user not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

// @route    Post api/post/like/:id
// @desc     Post post by id
// @access   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyLiked: "User already liked this post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "Post not Found" })
        );
    });
  }
);
// @route    Post api/post/unlike/:id
// @desc     Post post by id
// @access   private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ notliked: "User already liked this post" });
          }
          //Get the removed index
          removeIndex = post.likes.map((item) =>
            item.user.toString().indexOf(req.user.id)
          );

          // splice out of array
          post.likes.splice(removeIndex, 1);

          // save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "Post not Found" })
        );
    });
  }
);

// @route    Post api/post/comment/:id
// @desc     Post comment to post
// @access   private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // If any errors, send 400 with errors objects
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        if (post.comments.user == req.user.id) {
          return res.status(404).json({ comment: "already has comment" });
        }
        post.comments.unshift(newComment);

        //
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// router.get("/comment/:id", (req, res) => {
//   Post.findById(req.params.id)
//     .then((post) => {
//       if (post.comments._id === req.params.id) {
//         res.json(post.comments);
//       }
//     })
//     .catch(() =>
//       res.status(404).json({ nopostfound: "No post found with that id" })
//     );
// });

// @route    Delete api/post/comment/:id/:comment_id
// @desc     Delete comment
// @access   private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentdoesntexisit: "Comment doesnt exist" });
        }
        //Get Remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })

      .catch(() => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
