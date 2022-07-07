import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileAction";
import "./NavBar.css";
import { Dropdown } from "bootstrap";
const NavBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const [active, setActive] = useState("unActive");
  const [unActive, setUnActive] = useState("");
  const { isAuthenticated, user } = state;
  let dropDown = () => {
    if (active === "unActive") {
      setActive("active");
    }
  };

  let dropBack = () => {
    if (active === "active") {
      setUnActive("UnActive");
      setActive("unActive");
    }
  };
  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(clearCurrentProfile());
    dispatch(logOutUser());
    console.log("hello");
  };
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/feed" className="nav-link">
          Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          DashBoard
        </Link>
      </li>

      <li className="nav-item">
        <a href="www" onClick={onLogoutClick} className="nav-link">
          {" "}
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
            title="You must have a gravatar connected to you email to display an image"
          />
          logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div
        className="container"
        style={{
          margin: "0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" className="navbar-brand" href="www.g">
          Mentorship
        </Link>

        <button
          className="navbar-toggler"
          onClick={active === "active" ? (e) => dropBack() : (e) => dropDown()}
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
          <div className={`navbar-toggler-drop ${active} ${unActive}`}>
            <ul
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                listStyle: "none",
              }}
            >
              <li>
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>{" "}
              <li>
                {" "}
                <Link to="/register" className="nav-link">
                  Sign up
                </Link>
              </li>{" "}
              <li>
                {" "}
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </button>
        <div
          className="collapse navbar-collapse"
          id="mobile-nav"
          style={{ margin: "0", flex: "inherit" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
