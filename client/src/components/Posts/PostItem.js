import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePosts, addLike, removeLike } from "../../actions/postActions";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";

const PostItem = ({ post, showActons }) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   showActons = true;
  // }, []);

  const onDeleteClick = (id, e) => {
    dispatch(deletePosts(id));
  };
  const onLikesClick = (id, e) => {
    dispatch(addLike(id));
  };
  const onUnlikesClick = (id, e) => {
    dispatch(removeLike(id));
  };

  const findUserLikes = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="card card-body mb-3">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="show"
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text} </p>
            {showActons ? (
              <span>
                <button
                  onClick={(e) => onLikesClick(post._id, e)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": findUserLikes(post.likes),
                    })}
                  ></i>
                  <span className="badge bg-dark">{post.likes.length}</span>
                </button>
                <button
                  onClick={(e) => onUnlikesClick(post._id, e)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={(e) => onDeleteClick(post._id, e)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};
PostItem.defaultProps = {
  showActons: true,
};

export default PostItem;
