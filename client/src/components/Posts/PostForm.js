import React, { useEffect, useState } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import { useSelector, useDispatch } from "react-redux";
const PostForm = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.error);
  const [text, setText] = useState("");
  const [] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text: text,
      name: user.name,
      avatar: user.avatar,
    };
    dispatch(addPost(newPost, dispatch));
    setText("");
  };
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                type="text"
                placeholder="Short Bio"
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

export default PostForm;
