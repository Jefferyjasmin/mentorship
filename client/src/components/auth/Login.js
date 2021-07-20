import TextFieldGroup from "../common/TextFieldGroup";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

const Login = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  console.log("Auth from Login", auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    componentWillReceiveProps();
  }, [auth]);

  const componentWillReceiveProps = () => {
    if (auth) {
      history.push("/dashboard");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    dispatch(loginUser(userData));

    console.log("auth log", auth);
    console.log("Login User", userData);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center"> Log In</h1>
            <p className="lead text-center">
              Sign in to your Mentorship account
            </p>

            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": error?.email,
                })}
                error={error?.email}
              />
              <TextFieldGroup
                type="password"
                className="form-control form control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                error={error?.password}
              />

              <input type="submit" className="btn btn-info btn-dark mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default withRouter(Login);
