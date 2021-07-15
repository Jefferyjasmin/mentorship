import React, { useEffect } from "react";
import PostItem from "./PostItem";
import Spinner from "../common/Spinner";
import { useSelector, useDispatch } from "react-redux";

export const PostFeed = ({ posts }) => {
  const dispatch = useDispatch();
  console.log("post =>>>>>>", posts);

  const postItem = posts.map((post) => (
    <div>
      <PostItem post={post} />
    </div>
  ));
  return <div>{postItem}</div>;
};
