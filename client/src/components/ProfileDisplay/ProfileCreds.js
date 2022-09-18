import React from "react";
import Moment from "react-moment";
const ProfileCreds = ({ experience, education }) => {
  const expItems = experience.map((exp) => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="MM/dd/yyyy">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Present"
        ) : (
          <Moment format="MM/dd/yyyy">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: {exp.title}</strong>
      </p>
      <p>
        {exp.location === "" ? null : (
          <span>
            <strong>Position: </strong>
            {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === "" ? null : (
          <span>
            <strong>Description: </strong>
            {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  const eduItems = education.map((edu) => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="MM/dd/yyyy">{edu.from}</Moment>-{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="MM/dd/yyyy">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree : {edu.degree}</strong>
      </p>
      <p>
        <strong>Field Of Study : {edu.fieldofstudy}</strong>
      </p>
      <p>
        {edu.description === "" ? null : (
          <span>
            <strong>Description</strong>
            {edu.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info"> Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group" style={{ textAlign: "center" }}>
            {expItems}
          </ul>
        ) : (
          <p className="text-center"> No experience Listed</p>
        )}
      </div>

      <div className="col-md-6">
        <h3 className="text-center text-info"> Education</h3>
        {eduItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <p className="text-center"> No Education Listed</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCreds;
