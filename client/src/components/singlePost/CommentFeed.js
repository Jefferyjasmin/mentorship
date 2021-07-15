import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({ post }) => {
  const commentItem = post.comments.map((comment) => (
    <CommentItem comment={comment} />
  ));
  return <div>{commentItem}</div>;
};

export default CommentFeed;
