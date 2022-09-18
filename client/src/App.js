import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { logOutUser, setCurrentUser } from "./actions/authActions";
import Landing from "./components/Landing";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import DashBoard from "./components/dashboard/DashBoard";
import { clearCurrentProfile } from "./actions/profileAction";
import PrivateRoute from "./components/common/PrivateRoute";
import AddExperience from "./components/AddCredentials/AddEpxerience";
import AddEducation from "./components/AddCredentials/AddEducation";
import Post from "./components/singlePost/Post";
import EditProfile from "./components/Edit-profile/EditProfile";
import Createprofile from "./components/dashboard/create-profile/Createprofile";
// import ProfileItems from "./components/profile/ProfileItems";
import Profiles from "./components/profiles/Profiles";
import ProfileContainer from "./components/ProfileDisplay/ProfileContainer";
import NotFound from "./not-found/NotFound";
import Posts from "./components/Posts/Posts";

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logOutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/">
            <Landing />
          </Route>

          <Route exact path="/profiles">
            <Profiles />
          </Route>
          <Route exact path="/post/:id">
            <Post />
          </Route>

          <Route exact path="/profile/handle/:handle">
            <ProfileContainer />
          </Route>
          <Switch>
            <PrivateRoute exact path="/edit-profile">
              <EditProfile />
            </PrivateRoute>
          </Switch>

          <Switch>
            <PrivateRoute exact path="/add-experience">
              <AddExperience />
            </PrivateRoute>
          </Switch>

          <Switch>
            {" "}
            <PrivateRoute exact path="/add-education">
              <AddEducation />
            </PrivateRoute>
          </Switch>

          <div className="container">
            <Route exact path="/login">
              <Login />
            </Route>
            <Switch>
              <PrivateRoute exact path="/dashboard">
                <DashBoard />
              </PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/createprofile">
                <Createprofile />
              </PrivateRoute>
            </Switch>

            <Route exact path="/register">
              <Register />
            </Route>
            <Switch>
              <PrivateRoute exact path="/feed">
                <Posts />
              </PrivateRoute>
            </Switch>

            <Route exact path="/not-found">
              <NotFound />
            </Route>
          </div>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
