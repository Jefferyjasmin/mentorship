import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Landing = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  const componentDidMount = () => {
    if (auth) {
      history.push("/dashboard");
    }
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner  text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4"> Mentorship Connector</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link to="/register" className="btn">
                Sign up
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
