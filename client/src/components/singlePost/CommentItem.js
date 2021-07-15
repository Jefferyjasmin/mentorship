import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { deleteComment } from "../../actions/postActions";
import { useSelector, useDispatch } from "react-redux";

const CommentItem = ({ comment, showActons }) => {
  let { id } = useParams();
  const auth = useSelector((state) => state.auth);
  console.log("getting current id", id);
  const dispatch = useDispatch();

  const onDeleteClick = (commentId, e) => {
    dispatch(deleteComment(id, commentId));
  };

  return (
    <div className="card card-body mb-3">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt="show"
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text} </p>

            <button type="button" className="btn btn-light mr-1">
              <i className="fas fa-thumbs-up"></i>
              <span className="badge bg-dark">{comment.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>

            {comment.user === auth.user.id ? (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={(e) => onDeleteClick(comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};
CommentItem.defaultProps = {
  showActons: true,
};

export default CommentItem;
