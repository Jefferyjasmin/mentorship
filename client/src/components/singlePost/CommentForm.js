import React, { useEffect, useState } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";
import { useSelector, useDispatch } from "react-redux";

const CommentForm = ({ postId }) => {
  const user = useSelector((state) => state.auth.user);
  //   const postId = useSelector((state) => state.post.post._id);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.error);
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text: text,
      name: user.name,
      avatar: user.avatar,
      //   user: user.id,
    };
    dispatch(addComment(newComment, postId));
    setText("");
  };
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                type="text"
                placeholder="Reply to post"
                value={text}
                onChange={(e) => setText(e.target.value)}
                name="text"
                error={errors?.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
