import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileAction";
const Profile = () => {
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileByHandle());
  }, [dispatch]);

  return <div>This is profile pages</div>;
};

export default Profile;
