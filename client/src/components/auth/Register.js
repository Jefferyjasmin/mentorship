import React, { useState, useEffect } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import axios from "axios";
import { registerUser } from "../../actions/authActions";

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const componentDidMount = () => {
    if (auth) {
      history.push("/dashboard");
    }
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    dispatch(registerUser(newUser, history));
  };

  return (
    <div className="register" style={{ height: "80vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Mentor account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                type="text"
                className={
                  error?.name
                    ? " form-control form-control-lg is-invalid"
                    : " form-control form-control-lg"
                }
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                error={error.name}
                required
              />

              <TextFieldGroup
                type="email"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": error?.email,
                })}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                error={error.email}
                info={
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                }
              />

              <TextFieldGroup
                type="password"
                className="form-control form control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                error={error.password}
              />

              <TextFieldGroup
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Passowrd"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                name="password2"
                error={error.password2}
              />

              <input type="submit" className="btn btn-info btn-dark mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withRouter(Register);
