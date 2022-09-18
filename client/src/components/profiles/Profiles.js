import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../common/Spinner";
import { useParams, Link } from "react-router-dom";
import { getProfiles } from "../../actions/profileAction";
import ProfileItems from "../profile/ProfileItems";

const Profiles = () => {
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { profiles, loading } = userProfile;
  let profileItems;
  console.log("mapping =>>>", profiles);
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItems key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles</h4>;
    }
  }
  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
