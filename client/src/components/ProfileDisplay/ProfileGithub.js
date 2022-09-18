import React from "react";

const ProfileGithub = (username) => {
  console.log("this is username", username);
  let display;
  if (Object.keys(username).length < 1) {
    display = null;
  } else {
    display = (
      <>
        <h3 className="text-center text-info"> GitHub</h3>
        <div className="userName" style={{ textAlign: "center" }}>
          {username ? username.username : null}
        </div>
      </>
    );
  }
  return <div>{display}</div>;
};
export default ProfileGithub;
