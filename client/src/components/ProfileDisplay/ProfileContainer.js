import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import ProfileGithub from "./ProfileGithub";
import ProfileCreds from "./ProfileCreds";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileAction";
import NotFound from "../../not-found/NotFound";

const ProfileContainer = ({ match }) => {
  // let history = useHistory();
  const { handle } = useParams();
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { profile, loading } = userProfile;

  useEffect(() => {
    if (handle) {
      dispatch(getProfileByHandle(handle));
    }
  }, []);

  // React.useEffect(() => {
  //   return () => {
  //     if (profile === null && loading) {
  //       history.push("/not-found");
  //     }
  //   };
  // }, [profile, loading]);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    );

  return (
    <div className="profile">
      container
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
