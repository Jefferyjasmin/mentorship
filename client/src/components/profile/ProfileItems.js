import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty"; 

const ProfileItems = ({ profile }) => {
  // const profiles = useSelector((state) => state.profile.profiles);
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            src={profile.user.avatar}
            alt="profileImage"
            className="rounded-circle"
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}
            {isEmpty(profile.company) ? null : <span> {profile.company}</span>}
          </p>
          <p>
            {" "}
            {isEmpty(profile.location) ? null : (
              <span> {profile.location} </span>
            )}
          </p>
          <Link
            to={`profile/handle/${profile.handle}`}
            className="btn btn-info"
          >
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li className="list-group-item" key={index}>
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileItems;
