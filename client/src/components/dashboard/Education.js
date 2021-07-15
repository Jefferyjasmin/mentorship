import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileAction";

const Education = ({ education }) => {
  //   const userProfile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const onDeleteClick = (id) => {
    dispatch(deleteEducation(id));
  };
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="MM/DD/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "now"
        ) : (
          <Moment format="MM/DD/YYYY"> {edu.to}</Moment>
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
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thread>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
          <tbody>{educations}</tbody>
        </thread>
      </table>
    </div>
  );
};

export default Education;
