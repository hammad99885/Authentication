// Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "./../actions/index";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    // destructuring from redux state
    const { isAuthenticated, user } = this.props.auth;
    console.log(isAuthenticated)
    // creating view for authenticated user
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a href="/" onClick={e => e.preventDefault()}>
          {user.name}
        </a>
        <a href="/" className="nav-link" onClick={this.onLogout}>
          <img
            src={user.image}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
            
          />
          Logout
        </a>
      </ul>
    );

    // creating view for guest user
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          My Auth APP
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));

// onLogout(e) {
//   e.preventDefault();
//   this.props.logoutUser(this.props.history);
// }
