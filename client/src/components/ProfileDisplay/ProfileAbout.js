import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.trim().split(" ")[0];
  // skill list
  const skills = profile.skills.map((skill, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light md-3">
          <h3 className="text-center text-info"> {firstName} Bio</h3>
          <p className="lead" style={{ textAlign: "center" }}>
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have a bio</span>
            ) : (
              <span style={{ textAlign: "center" }}>{profile.bio}</span>
            )}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center aligin-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileAbout;
