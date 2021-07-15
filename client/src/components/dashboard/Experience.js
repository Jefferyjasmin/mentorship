import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileAction";

const Experience = ({ experience }) => {
  //   const userProfile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const onDeleteClick = (id) => {
    dispatch(deleteExperience(id));
  };
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "now"
        ) : (
          <Moment format="MM/DD/YYYY"> {exp.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thread>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
          <tbody>{experiences}</tbody>
        </thread>
      </table>
    </div>
  );
};

export default withRouter(Experience);
