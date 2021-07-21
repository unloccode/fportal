//import logo from './logo.svg';s
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import AuthService from "./services/auth.service.js";

import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';


class App extends React.Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    console.log(user);
    if(user){
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut(){
    AuthService.logout();
  }
  render(){
    //some awesome code
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">Unloccode</Link>
          <div className="navba-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">Home</Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">Moderator Board</Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">Admin Board</Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">User</Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ): (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">Sign Up</Link>
              </li>
            </div>
          )
        }
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path ="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
