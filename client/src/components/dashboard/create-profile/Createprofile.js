import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import InputFieldGroup from "../../common/InputFieldGroup";

import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { createProfile } from "../../../actions/profileAction";

const Createprofile = ({ history }) => {
  // const state = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [handle, setHandel] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [skills, setSkills] = useState("");

  const [info, setInfo] = useState("");

  // const [profileState, setProfileState] = useState({
  //   handle: "",
  //   company: "",
  //   website: "",
  //   location: "",
  //   status: "",
  //   githubusername: "",
  //   bio: "",
  //   twitter: "",
  //   facebook: "",
  //   linkedin: "",
  //   youtube: "",
  //   info: "",
  //   instagram: "",
  // });

  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      displaySocialInputs: displaySocialInputs,
      skills: skills ? skills : "",
      handle: handle ? handle : "",
      company: company ? company : "",
      website: website ? website : "",
      location: location ? location : "",
      status: status ? status : "",
      githubusername: githubusername ? githubusername : "",
      bio: bio ? bio : "",
      twitter: twitter ? twitter : "",
      facebook: facebook ? facebook : "",
      linkedin: linkedin ? linkedin : "",
      youtube: youtube ? youtube : "",
      info: info ? info : "",
      instagram: instagram ? instagram : "",
    };
    console.log("profileData:=>>>> " + profileData);
    dispatch(createProfile(profileData, history));
  };

  const toggleState = (e) => {
    e.preventDefault();
    let toggle = displaySocialInputs;
    if (toggle === displaySocialInputs) {
      setDisplaySocialInputs(!toggle);
    }
  };

  //Selection options for status
  const [options] = useState([
    { label: "Select Professional Status", value: 0 },
    { label: "Medical Professional", value: "Medical Professional " },
    { label: "Developer", value: "Devleoper " },
    { label: "Junior Developer", value: " Junior Devleoper " },
    { label: "Senior Developer", value: " Senior Devleoper " },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
    { label: "Unemployed", value: "Unemployed" },
  ]);
  let socialInputs;
  if (displaySocialInputs === true) {
    socialInputs = (
      <div>
        <InputFieldGroup
          name="twitter"
          placeholder="Twitter Profile Url"
          value={twitter}
          icon="fab fa-twitter"
          onChange={(e) => setTwitter({ twitter: e.target.value })}
          error={error?.twitter}
        />
        <InputFieldGroup
          name="facebook"
          placeholder="Facebook Profile Url"
          value={facebook}
          icon="fab fa-facebook"
          onChange={(e) => setFacebook({ facebook: e.target.value })}
          error={error?.facebook}
        />
        <InputFieldGroup
          name="linkedin"
          placeholder="Linkedin Profile Url"
          value={linkedin}
          icon="fab fa-linkedin"
          onChange={(e) => setLinkedin({ linkedin: e.target.value })}
          error={error.linkedin}
        />
        <InputFieldGroup
          name="youtube"
          placeholder="Youtube Profile Url"
          value={youtube}
          icon="fab fa-youtube"
          onChange={(e) => setYoutube({ youtube: e.target.value })}
          error={error?.youtube}
        />
        <InputFieldGroup
          name="instagram"
          placeholder="Instagram Profile Url"
          value={instagram}
          icon="fab fa-instagram"
          onChange={(e) => setInstagram({ instagram: e.target.value })}
          error={error?.instagram}
        />
      </div>
    );
  }
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center"> Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">*= Required Fields</small>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  className={
                    error?.handle
                      ? " form-control form-control-lg is-invalid"
                      : " form-control form-control-lg"
                  }
                  placeholder="* Profile Handle"
                  value={handle}
                  onChange={(e) => setHandel(e.target.value)}
                  name="handle"
                  error={error?.handle}
                  info="A unique handle for you profile URL. Your full name, company, nickname"
                  required
                />

                <select
                  info="Tell us where you are in your career"
                  className={
                    error?.status
                      ? " form-control form-control-lg is-invalid"
                      : " form-control form-control-lg"
                  }
                  placeholder="status"
                  value={status}
                  name={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {options.map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {error?.status ? (
                  <div className="invalid-feedback"> {error.status}</div>
                ) : (
                  <small className="form-text text-muted">
                    Tell us where you are in your career
                  </small>
                )}

                <TextFieldGroup
                  type="text"
                  className={
                    error?.handle
                      ? " form-control form-control-lg is-invalid"
                      : " form-control form-control-lg"
                  }
                  placeholder=" Company "
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  name="company"
                  error={error?.company}
                  info="List your own company or your employer"
                  required
                />

                <TextFieldGroup
                  type="text"
                  className={
                    error?.website
                      ? " form-control form-control-lg is-invalid"
                      : " form-control form-control-lg"
                  }
                  placeholder="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  name="website"
                  error={error.website}
                  info="Enter you website"
                  required
                />

                <TextFieldGroup
                  type="text"
                  className={
                    error?.handle
                      ? " form-control form-control-lg is-invalid"
                      : " form-control form-control-lg"
                  }
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  name="location"
                  error={error?.location}
                  info="City or city & state suggested(eg.Boston,MA)"
                  required
                />

                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    className={
                      error?.skills
                        ? " form-control form-control-lg is-invalid"
                        : " form-control form-control-lg"
                    }
                    placeholder="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    name="skills"
                    error={error.skills}
                    info="Please use comma separated values (eg.HTML,CSS,JAVASCRIPT,PHP)"
                    required
                  />
                  <TextFieldGroup
                    type="text"
                    className={
                      error?.githubusername
                        ? " form-control form-control-lg is-invalid"
                        : " form-control form-control-lg"
                    }
                    placeholder="Github Username"
                    value={githubusername}
                    onChange={(e) => setGithubusername(e.target.value)}
                    name="githubusername"
                    error={error.githubusername}
                    info="If you want you latest repos and a Github link, include your username"
                    required
                  />

                  <TextAreaFieldGroup
                    type="text"
                    placeholder="Short Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    error={error?.bio}
                    info="Tell us a little about your self"
                    required
                  />
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={toggleState}
                    >
                      Add Social Network Links
                    </button>{" "}
                    <span className="text-muted">optional </span>
                  </div>
                  {socialInputs}
                  <input
                    style={{ width: "100%" }}
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Createprofile.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default withRouter(Createprofile);
