import React, { useEffect } from "react";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { PostFeed } from "./PostFeed";
const Posts = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let postContent;
  if (post === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }
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
};

export default Posts;
