import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, auth, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      return auth.isAuthenticated === true ? (
        children
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
