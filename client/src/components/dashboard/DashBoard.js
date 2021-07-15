import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Experience from "./Experience";

import { ProfileActions } from "./ProfileActions";
import Education from "./Education";
const DashBoard = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.profile);
  const auth = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.profile);
  console.log("profile state", profileState);
  console.log("auth state", auth);
  // const error = useSelector((state) => state.error);
  const { user } = auth;
  const { profile, loading } = profileState;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const onDeleteClick = (e) => {
    dispatch(deleteAccount());
  };

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            {" "}
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>

          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginBottom: "60px" }} />
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      );
    } else {
      // logged in but no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted"> Welcome {user.name}</p>
          <p>You haven't Created a profile lets get started </p>
          <Link to="/createprofile " className="btn btn-lg btn-dark">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Welcome to dashboard</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default DashBoard;
