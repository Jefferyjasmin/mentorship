import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addExperience } from "../../actions/profileAction";

import TextFieldGroup from "../common/TextFieldGroup";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const AddEpxerience = ({ history }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const profileState = useSelector((state) => state.profile);
  console.log(profileState);

  //State....
  const [company, setCompany] = useState("");
  const [to, setTo] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [current, setCurrent] = useState(false);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  //State....

  //Functions ....../
  const onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      disabled: disabled,
      company: company,
      location: location,
      to: to,
      current: current,
      from: from,
      title: title,
      description: description,
    };

    dispatch(addExperience(expData, history));
  };

  const onCheck = (e) => {
    setCurrent(!current);
    setDisabled(!disabled);
    setTo("");
  };

  //Functions ....../

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past up to your
              current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="text"
                className={
                  error?.company
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                name="company"
                error={error.company}
                required
              />
              <TextFieldGroup
                type="text"
                className={
                  error?.title
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* Job Title "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                error={error.title}
                required
              />
              <TextFieldGroup
                type="text "
                className={
                  error?.location
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                error={error.title}
              />
              <h6> From Date</h6>
              <TextFieldGroup
                type="date"
                className={
                  error?.from
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                name="from"
                error={error.from}
              />
              <h6 style={{ marginTop: "10px" }}> TO Date </h6>
              <TextFieldGroup
                type="date"
                className={
                  error?.To
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                name="to"
                error={error.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Current"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                type="text"
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                error={error?.description}
                info="Tell us  about the position"
              />

              <input
                type="submit"
                value="submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddEpxerience);
