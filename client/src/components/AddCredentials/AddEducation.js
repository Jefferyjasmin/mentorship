import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../actions/profileAction";

import TextFieldGroup from "../common/TextFieldGroup";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const AddEducation = ({ history }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const profileState = useSelector((state) => state.profile);
  console.log(profileState);

  //State....
  const [school, setSchool] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [current, setCurrent] = useState(false);

  const [to, setTo] = useState("");
  //State....

  //Functions ....../
  const onSubmit = (e) => {
    e.preventDefault();

    const eduData = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      to: to,
      current: current,
      from: from,

      description: description,
    };

    dispatch(addEducation(eduData, history));
  };

  const onCheck = (e) => {
    setCurrent(!current);
    setDisabled(!disabled);
    setTo("");
  };

  //Functions ....../

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any School Bootcamp ect.. that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="text"
                className={
                  error?.school
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                name="school"
                error={error.school}
                required
              />
              <TextFieldGroup
                type="text"
                className={
                  error?.degree
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* Degree or Certification "
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                name="degree"
                error={error.degree}
                required
              />
              <TextFieldGroup
                type="text "
                className={
                  error?.fieldofstudy
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="* Field Of Study"
                value={fieldofstudy}
                onChange={(e) => setFieldofstudy(e.target.value)}
                name="fieldofstudy"
                error={error.fieldofstudy}
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
                placeholder="Program Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                error={error?.description}
                info="Tell us  about the program that you where in "
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

export default withRouter(AddEducation);
