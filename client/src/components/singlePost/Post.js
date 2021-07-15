import React, { useEffect } from "react";
import Spinner from "../common/Spinner";
import { getPost } from "../../actions/postActions";
import { useParams, Link } from "react-router-dom";
import PostItem from "../../components/Posts/PostItem";
import CommentForm from "../singlePost/CommentForm";
import { useSelector, useDispatch } from "react-redux";
import CommentFeed from "./CommentFeed";
const Post = ({ showActons }) => {
  const postState = useSelector((state) => state.post);
  const { post, loading } = postState;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActons={false} />
        <CommentForm postId={post._id} />
        <CommentFeed post={post} />
      </div>
    );
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
